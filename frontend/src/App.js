import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  Header, 
  HeroSection, 
  FeaturedDestinations, 
  AboutSection, 
  PaymentSection, 
  Footer,
  FlightResults,
  PaymentModal,
  PaymentStatus
} from './components';

// Main Home Component
const Home = () => {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('EUR');
  const [theme, setTheme] = useState('summer');
  const [flightResults, setFlightResults] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Auto-detect theme based on current month (June = summer)
  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1; // 1-12
    // Summer months: June, July, August, September (6-9)
    // Winter months: October, November, December, January, February, March, April, May (10-12, 1-5)
    const isSummer = currentMonth >= 6 && currentMonth <= 9;
    setTheme(isSummer ? 'summer' : 'winter');
  }, []);

  const handleFlightResults = (flights) => {
    setFlightResults(flights);
  };

  const handleBookFlight = (flight) => {
    setSelectedFlight(flight);
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedFlight(null);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setSelectedFlight(null);
    // Handle successful payment (redirect, show confirmation, etc.)
  };

  return (
    <div className="App">
      <Header 
        language={language} 
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        theme={theme}
        setTheme={setTheme}
      />
      
      <HeroSection 
        language={language}
        currency={currency}
        theme={theme}
        onFlightResults={handleFlightResults}
      />
      
      {flightResults.length > 0 && (
        <FlightResults 
          flights={flightResults}
          language={language}
          currency={currency}
          theme={theme}
          onBookFlight={handleBookFlight}
        />
      )}
      
      <FeaturedDestinations 
        language={language}
        currency={currency}
        theme={theme}
      />
      
      <AboutSection 
        language={language}
        theme={theme}
      />
      
      <PaymentSection 
        language={language}
        theme={theme}
      />
      
      <Footer 
        language={language}
        theme={theme}
      />

      {/* Payment Modal */}
      <PaymentModal 
        flight={selectedFlight}
        language={language}
        currency={currency}
        theme={theme}
        isOpen={showPaymentModal}
        onClose={handleClosePaymentModal}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

// Main App Component with Routing
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking-success" element={<PaymentSuccessPage />} />
        <Route path="/booking-cancelled" element={<PaymentCancelledPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Payment Success Page
const PaymentSuccessPage = () => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('summer');

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const isSummer = currentMonth >= 6 && currentMonth <= 9;
    setTheme(isSummer ? 'summer' : 'winter');
  }, []);

  return <PaymentStatus language={language} theme={theme} />;
};

// Payment Cancelled Page  
const PaymentCancelledPage = () => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('summer');

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const isSummer = currentMonth >= 6 && currentMonth <= 9;
    setTheme(isSummer ? 'summer' : 'winter');
  }, []);

  const translations = {
    en: {
      cancelled: 'Booking Cancelled',
      message: 'Your booking has been cancelled. No charges were made.',
      backToHome: 'Back to Home'
    },
    fr: {
      cancelled: 'Réservation Annulée',
      message: 'Votre réservation a été annulée. Aucun frais n\'a été facturé.',
      backToHome: 'Retour à l\'Accueil'
    },
    ar: {
      cancelled: 'تم إلغاء الحجز',
      message: 'تم إلغاء حجزك. لم يتم تحصيل أي رسوم.',
      backToHome: 'العودة إلى الصفحة الرئيسية'
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
        <div className="text-yellow-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.cancelled}</h2>
        <p className="text-gray-600 mb-6">{t.message}</p>
        <button
          onClick={() => window.location.href = '/'}
          className={`w-full ${theme === 'summer' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'} text-white py-3 rounded-lg font-semibold transition-colors`}
        >
          {t.backToHome}
        </button>
      </div>
    </div>
  );
};

export default App;