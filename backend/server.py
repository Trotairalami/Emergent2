import os
import logging
from pathlib import Path
from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import uuid
from datetime import datetime
import httpx
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout,
    CheckoutSessionResponse,
    CheckoutStatusResponse,
    CheckoutSessionRequest
)

# Configure logging at the top!
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('/tmp/backend.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(str(ROOT_DIR / '.env'))

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
if not mongo_url:
    raise RuntimeError("MONGO_URL not set in environment")
client = AsyncIOMotorClient(mongo_url)
db_name = os.environ.get('DB_NAME')
if not db_name:
    raise RuntimeError("DB_NAME not set in environment")
db = client[db_name]

# Initialize Stripe
stripe_checkout = StripeCheckout(api_key=os.environ.get('STRIPE_SECRET_KEY'))

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

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
    passengers: List[Dict] = Field(default_factory=lambda: [{"type": "adult"}])

class PaymentRequest(BaseModel):
    flight_offer_id: str
    amount: float
    currency: str
    origin_url: str
    metadata: Dict[str, str] = {}

# Routes
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

@api_router.get("/health")
async def health_check():
    return {"status": "ok"}

# Flight Search Endpoints
@api_router.get("/places/suggestions")
async def get_place_suggestions(query: str, types: str = "airport"):
    if not query or len(query) < 2:
        return {"data": []}

    api_key = os.getenv('DUFFEL_ACCESS_TOKEN')
    if not api_key:
        logger.error("DUFFEL_ACCESS_TOKEN not found in environment variables")
        return {"data": []}

    logger.info("Places API request for query: " + query)
    type_list = [t.strip() for t in types.split(",")]
    params = {"query": query}
    for idx, place_type in enumerate(type_list):
        params[f"types[{idx}]"] = place_type

    async with httpx.AsyncClient(timeout=30.0) as client:
        headers = {
            "Authorization": "Bearer " + api_key,
            "Duffel-Version": "v2",
            "Accept": "application/json"
        }
        logger.info("Places API headers: " + str(dict(headers)))
        try:
            response = await client.get(
                "https://api.duffel.com/places/suggestions",
                headers=headers,
                params=params
            )
            logger.info("Places API response status: " + str(response.status_code))
            if response.status_code != 200:
                logger.error("Duffel Places API error " + str(response.status_code) + ": " + await response.text())
                return {"data": []}
            return await response.json()
        except httpx.TimeoutException:
            logger.warning("Places API timeout")
            return {"data": []}
        except Exception as e:
            logger.error("Places API error: " + str(e))
            return {"data": []}

@api_router.post("/flights/search")
async def search_flights(request: FlightSearchRequest):
    try:
        logger.info(f"Flight search request: {request.origin} -> {request.destination} on {request.departure_date}")
        if not request.origin or not request.destination or not request.departure_date:
            raise HTTPException(status_code=400, detail="Missing required fields: origin, destination, or departure_date")
        passengers = [{"type": "adult"} for _ in range(request.passengers)]
        slices = [{
            "origin": request.origin,
            "destination": request.destination,
            "departure_date": request.departure_date
        }]
        if request.return_date:
            slices.append({
                "origin": request.destination,
                "destination": request.origin,
                "departure_date": request.return_date
            })
        payload = {
            "data": {
                "slices": slices,
                "passengers": passengers,
                "

