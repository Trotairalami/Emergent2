from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import uuid
from datetime import datetime
import httpx
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize Stripe
stripe_checkout = StripeCheckout(api_key=os.environ.get('STRIPE_SECRET_KEY'))

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Duffel API Models
class FlightSearchRequest(BaseModel):
    origin: str
    destination: str
    departure_date: str
    return_date: Optional[str] = None
    passengers: int = 1
    cabin_class: str = "economy"

class OfferRequest(BaseModel):
    origin: str
    destination: str
    departure_date: str
    return_date: Optional[str] = None
    passengers: List[Dict] = [{"type": "adult"}]

# Payment Models
class PaymentRequest(BaseModel):
    flight_offer_id: str
    amount: float
    currency: str
    origin_url: str
    metadata: Dict[str, str] = {}

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Flight Search Endpoints
# Flight Search Endpoints
@api_router.get("/places/suggestions")
async def get_place_suggestions(query: str, types: str = "airport"):
    """Get place suggestions from Duffel API for autocomplete"""
    
    if not query or len(query) < 2:
        return {"data": []}
    
    # Parse types parameter (can be comma-separated)
    type_list = [t.strip() for t in types.split(",")]
    
    # Build query parameters
    params = {
        "query": query,
    }
    
    # Add types as separate parameters
    for place_type in type_list:
        if "types[]" in params:
            # Handle multiple types
            params["types[" + str(len([k for k in params.keys() if k.startswith("types[")])) + "]"] = place_type
        else:
            params["types[]"] = place_type

    async with httpx.AsyncClient(timeout=30.0) as client:
        headers = {
            "Authorization": "Bearer " + str(os.getenv("DUFFEL_ACCESS_TOKEN")),
            "Duffel-Version": "v2",
            "Accept": "application/json"
        }
        
        try:
            response = await client.get(
                "https://api.duffel.com/places/suggestions",
                headers=headers,
                params=params
            )
            
            if response.status_code != 200:
                logger.error("Duffel Places API error: " + str(response.text))
                return {"data": []}
            
            return response.json()
            
        except httpx.TimeoutException:
            logger.warning("Places API timeout")
            return {"data": []}
        except Exception as e:
            logger.error("Places API error: " + str(e))
            return {"data": []}

@api_router.post("/flights/search")
async def search_flights(request: FlightSearchRequest):
    """Search flights using Duffel API"""
    
    # Build passengers array based on count
    passengers = [{"type": "adult"} for _ in range(request.passengers)]
    
    # Build slices for the request
    slices = [
        {
            "origin": request.origin,
            "destination": request.destination,
            "departure_date": request.departure_date
        }
    ]
    
    # Add return slice if return date provided
    if request.return_date:
        slices.append({
            "origin": request.destination,
            "destination": request.origin,
            "departure_date": request.return_date
        })

    # Duffel API payload
    payload = {
        "data": {
            "slices": slices,
            "passengers": passengers,
            "cabin_class": request.cabin_class,
            "return_offers": True
        }
    }

    # Make request to Duffel API
    async with httpx.AsyncClient(timeout=30.0) as client:
        headers = {
            "Authorization": f"Bearer {os.getenv('DUFFEL_ACCESS_TOKEN')}",
            "Duffel-Version": "v2",
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        
        try:
            response = await client.post(
                "https://api.duffel.com/air/offer_requests",
                headers=headers,
                json=payload
            )
            
            if response.status_code != 200:
                logger.error(f"Duffel API error: {response.text}")
                raise HTTPException(
                    status_code=response.status_code, 
                    detail=f"Flight search failed: {response.text}"
                )
            
            response_data = response.json()
            
            # Store search in MongoDB
            search_doc = {
                "offer_request_id": response_data["data"]["id"],
                "origin": request.origin,
                "destination": request.destination,
                "departure_date": request.departure_date,
                "return_date": request.return_date,
                "passengers": request.passengers,
                "cabin_class": request.cabin_class,
                "created_at": datetime.utcnow()
            }
            await db.flight_searches.insert_one(search_doc)
            
            return response_data
            
        except httpx.TimeoutException:
            raise HTTPException(status_code=408, detail="Request timeout")
        except Exception as e:
            logger.error(f"Flight search error: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/flights/offers/{offer_id}")
async def get_offer(offer_id: str):
    """Get specific offer details from Duffel API"""
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        headers = {
            "Authorization": f"Bearer {os.getenv('DUFFEL_ACCESS_TOKEN')}",
            "Duffel-Version": "v2",
            "Accept": "application/json"
        }
        
        try:
            response = await client.get(
                f"https://api.duffel.com/air/offers/{offer_id}",
                headers=headers
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Duffel API error: {response.text}"
                )
            
            return response.json()
            
        except httpx.TimeoutException:
            raise HTTPException(status_code=408, detail="Request timeout")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

# Payment Endpoints
@api_router.post("/payments/v1/checkout/session")
async def create_checkout_session(request: PaymentRequest):
    """Create Stripe checkout session for flight booking"""
    
    try:
        # Build URLs from provided origin
        success_url = f"{request.origin_url}/booking-success?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{request.origin_url}/booking-cancelled"
        
        # Create checkout session request
        checkout_request = CheckoutSessionRequest(
            amount=request.amount,
            currency=request.currency,
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                **request.metadata,
                "flight_offer_id": request.flight_offer_id,
                "source": "trotair_flight_booking"
            }
        )
        
        # Create checkout session
        session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Store payment transaction
        payment_doc = {
            "session_id": session.session_id,
            "flight_offer_id": request.flight_offer_id,
            "amount": request.amount,
            "currency": request.currency,
            "metadata": checkout_request.metadata,
            "payment_status": "pending",
            "status": "initiated",
            "created_at": datetime.utcnow()
        }
        await db.payment_transactions.insert_one(payment_doc)
        
        return {"url": session.url, "session_id": session.session_id}
        
    except Exception as e:
        logger.error(f"Payment session creation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/payments/v1/checkout/status/{session_id}")
async def get_checkout_status(session_id: str):
    """Get checkout session status"""
    
    try:
        # Get status from Stripe
        checkout_status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        # Update payment transaction in database
        existing_transaction = await db.payment_transactions.find_one({"session_id": session_id})
        if existing_transaction:
            await db.payment_transactions.update_one(
                {"session_id": session_id},
                {
                    "$set": {
                        "status": checkout_status.status,
                        "payment_status": checkout_status.payment_status,
                        "updated_at": datetime.utcnow()
                    }
                }
            )
        
        return {
            "status": checkout_status.status,
            "payment_status": checkout_status.payment_status,
            "amount_total": checkout_status.amount_total,
            "currency": checkout_status.currency,
            "metadata": checkout_status.metadata
        }
        
    except Exception as e:
        logger.error(f"Payment status check error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
