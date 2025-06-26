import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Initialize Stripe (use new test key)
const stripePromise = loadStripe('pk_test_51ReIzTCO0J8T4Na1uBGqSJW1qyWpPrEybsoZCxY4DNrPeBE8KUb3xAZ3a5auT7JM9PQwDjgxNJY6pJ1IpY8x9kkX00LHgO2GUE');

// Trotair Airplane SVG Component for Brand Identity
export const TrotairPlane = ({ className = "", size = 40, theme = "summer", opacity = 1, rotation = 0 }) => {
  const planeColor = theme === 'summer' ? '#F59E0B' : '#10B981'; // Amber for summer, Emerald for winter
  const accentColor = theme === 'summer' ? '#FCD34D' : '#34D399'; // Lighter amber/emerald
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      style={{ opacity, transform: `rotate(${rotation}deg)` }}
    >
      <defs>
        <linearGradient id={`planeGradient-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="1" />
          <stop offset="50%" stopColor={planeColor} stopOpacity="1" />
          <stop offset="100%" stopColor={planeColor} stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id={`wingGradient-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={planeColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={planeColor} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      
      {/* Main fuselage */}
      <ellipse
        cx="50"
        cy="50"
        rx="35"
        ry="8"
        fill={`url(#planeGradient-${theme})`}
        stroke={planeColor}
        strokeWidth="1"
      />
      
      {/* Nose cone */}
      <ellipse
        cx="20"
        cy="50"
        rx="8"
        ry="6"
        fill={accentColor}
        stroke={planeColor}
        strokeWidth="0.5"
      />
      
      {/* Main wings */}
      <ellipse
        cx="45"
        cy="35"
        rx="20"
        ry="4"
        fill={`url(#wingGradient-${theme})`}
        stroke={planeColor}
        strokeWidth="0.5"
      />
      <ellipse
        cx="45"
        cy="65"
        rx="20"
        ry="4"
        fill={`url(#wingGradient-${theme})`}
        stroke={planeColor}
        strokeWidth="0.5"
      />
      
      {/* Tail wing */}
      <ellipse
        cx="75"
        cy="50"
        rx="8"
        ry="12"
        fill={`url(#wingGradient-${theme})`}
        stroke={planeColor}
        strokeWidth="0.5"
      />
      
      {/* Windows */}
      <circle cx="35" cy="50" r="2" fill="white" opacity="0.9" />
      <circle cx="42" cy="50" r="2" fill="white" opacity="0.9" />
      <circle cx="49" cy="50" r="2" fill="white" opacity="0.9" />
      <circle cx="56" cy="50" r="2" fill="white" opacity="0.9" />
      
      {/* Engine details */}
      <circle cx="40" cy="35" r="3" fill={accentColor} opacity="0.8" />
      <circle cx="40" cy="65" r="3" fill={accentColor} opacity="0.8" />
      
      {/* Propeller/engine glow */}
      <circle cx="15" cy="50" r="4" fill={accentColor} opacity="0.6" />
      <circle cx="15" cy="50" r="2" fill="white" opacity="0.8" />
    </svg>
  );
};

// Animated Trotair Plane Component
export const AnimatedTrotairPlane = ({ className = "", size = 40, theme = "summer", opacity = 1, animate = true, direction = "right" }) => {
  const animationClass = animate ? (direction === "right" ? "animate-bounce" : "animate-pulse") : "";
  const rotation = direction === "left" ? 180 : 0;
  
  return (
    <div className={`${animationClass} ${className}`}>
      <TrotairPlane size={size} theme={theme} opacity={opacity} rotation={rotation} />
    </div>
  );
};

// Airplane Trail Effect Component
export const PlaneTrail = ({ theme, className = "", direction = "right" }) => {
  const trailColor = theme === 'summer' ? '#FCD34D' : '#34D399';
  
  return (
    <div className={`flex items-center ${direction === 'left' ? 'flex-row-reverse' : ''} ${className}`}>
      <TrotairPlane size={24} theme={theme} opacity={0.8} rotation={direction === 'left' ? 180 : 0} />
      {/* Trail dots */}
      <div className={`flex items-center space-x-1 ${direction === 'left' ? 'mr-2' : 'ml-2'}`}>
        <div className={`w-1 h-1 rounded-full animate-pulse`} style={{ backgroundColor: trailColor, opacity: 0.8 }}></div>
        <div className={`w-1 h-1 rounded-full animate-pulse delay-75`} style={{ backgroundColor: trailColor, opacity: 0.6 }}></div>
        <div className={`w-1 h-1 rounded-full animate-pulse delay-150`} style={{ backgroundColor: trailColor, opacity: 0.4 }}></div>
        <div className={`w-1 h-1 rounded-full animate-pulse delay-200`} style={{ backgroundColor: trailColor, opacity: 0.2 }}></div>
      </div>
    </div>
  );
};

// Flying Airplanes Background Motif Component
export const AirplaneMotif = ({ theme, className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large flying airplane */}
      <div className="absolute top-1/4 right-1/4 transform rotate-12 animate-pulse">
        <TrotairPlane size={120} theme={theme} opacity={0.08} rotation={-15} />
      </div>
      
      {/* Medium airplanes with trails */}
      <div className="absolute top-3/4 left-1/4 transform -rotate-12">
        <PlaneTrail theme={theme} direction="right" className="opacity-60" />
      </div>
      
      <div className="absolute top-1/2 right-1/3 transform rotate-45">
        <TrotairPlane size={60} theme={theme} opacity={0.06} rotation={30} />
      </div>
      
      {/* Small accent airplanes */}
      <div className="absolute top-1/6 left-1/3 transform rotate-30">
        <TrotairPlane size={30} theme={theme} opacity={0.05} rotation={-45} />
      </div>
      
      <div className="absolute bottom-1/4 right-1/6 transform -rotate-30">
        <TrotairPlane size={40} theme={theme} opacity={0.07} rotation={60} />
      </div>
      
      {/* Flying formation */}
      <div className="absolute top-1/3 left-1/2 transform rotate-6">
        <div className="flex space-x-3 opacity-50">
          <TrotairPlane size={20} theme={theme} opacity={0.4} />
          <TrotairPlane size={18} theme={theme} opacity={0.3} />
          <TrotairPlane size={16} theme={theme} opacity={0.2} />
        </div>
      </div>
    </div>
  );
};

// Airport Autocomplete Component
export const AirportAutocomplete = ({ value, onChange, placeholder, className = "" }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/places/suggestions`, {
        params: { query, types: 'airport,city' }
      });
      
      if (response.data && response.data.data) {
        setSuggestions(response.data.data);
        setShowDropdown(true);
        setSelectedIndex(-1);
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    []
  );

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    debouncedFetchSuggestions(newValue);
  };

  const handleSuggestionClick = (suggestion) => {
    const displayValue = suggestion.iata_code ? `${suggestion.iata_code} - ${suggestion.name}` : suggestion.name;
    onChange(displayValue);
    setShowDropdown(false);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleBlur = (e) => {
    // Delay hiding dropdown to allow clicks on suggestions
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    }, 150);
  };

  const formatSuggestion = (suggestion) => {
    if (suggestion.iata_code) {
      return {
        primary: `${suggestion.iata_code} - ${suggestion.name}`,
        secondary: `${suggestion.city_name || suggestion.name}, ${suggestion.iata_country_code}`
      };
    } else {
      return {
        primary: suggestion.name,
        secondary: `${suggestion.iata_country_code}`
      };
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={() => {
          if (suggestions.length > 0) setShowDropdown(true);
        }}
        placeholder={placeholder}
        className={`w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base ${className}`}
        autoComplete="off"
      />
      
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        </div>
      )}

      {showDropdown && suggestions.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => {
            const formatted = formatSuggestion(suggestion);
            return (
              <div
                key={suggestion.id || index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors ${
                  selectedIndex === index ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {suggestion.type === 'airport' ? '✈️' : '🏙️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {formatted.primary}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {formatted.secondary}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Debounce utility function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Trotair Moroccan Star SVG Component - Based on actual logo
export const TrotairStar = ({ className = "", size = 40, theme = "summer", opacity = 1 }) => {
  const starColor = theme === 'summer' ? '#F59E0B' : '#10B981'; // Amber for summer, Emerald for winter
  const accentColor = theme === 'summer' ? '#FCD34D' : '#34D399'; // Lighter amber/emerald
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={className}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id={`starGradient-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="1" />
          <stop offset="50%" stopColor={starColor} stopOpacity="1" />
          <stop offset="100%" stopColor={starColor} stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id={`innerGradient-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={starColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={starColor} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      
      {/* Outer 8-pointed star */}
      <path
        d="M50 8 L56 28 L76 28 L62 42 L68 62 L50 50 L32 62 L38 42 L24 28 L44 28 Z M50 8 L44 28 L24 28 L38 42 L32 62 L50 50 L68 62 L62 42 L76 28 L56 28 Z"
        fill={`url(#starGradient-${theme})`}
        stroke={starColor}
        strokeWidth="0.5"
      />
      
      {/* Outer star border enhancement */}
      <path
        d="M50 12 L55 30 L73 30 L61 41 L66 59 L50 48 L34 59 L39 41 L27 30 L45 30 Z"
        fill="none"
        stroke={accentColor}
        strokeWidth="1"
        opacity="0.7"
      />
      
      {/* Inner geometric star pattern */}
      <path
        d="M50 25 L55 35 L65 35 L58 45 L63 55 L50 48 L37 55 L42 45 L35 35 L45 35 Z"
        fill={`url(#innerGradient-${theme})`}
        stroke={starColor}
        strokeWidth="1"
      />
      
      {/* Internal cross pattern */}
      <path
        d="M50 30 L50 45 M42 37.5 L58 37.5 M46 33 L54 42 M46 42 L54 33"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />
      
      {/* Center decorative element */}
      <circle
        cx="50"
        cy="37.5"
        r="3"
        fill={accentColor}
        stroke={starColor}
        strokeWidth="0.5"
      />
      
      {/* Small decorative dots */}
      <circle cx="50" cy="20" r="1.5" fill={accentColor} opacity="0.9" />
      <circle cx="50" cy="55" r="1.5" fill={accentColor} opacity="0.9" />
      <circle cx="35" cy="37.5" r="1.5" fill={accentColor} opacity="0.9" />
      <circle cx="65" cy="37.5" r="1.5" fill={accentColor} opacity="0.9" />
      
      {/* Corner accent points */}
      <circle cx="42" cy="30" r="1" fill={accentColor} opacity="0.7" />
      <circle cx="58" cy="30" r="1" fill={accentColor} opacity="0.7" />
      <circle cx="42" cy="45" r="1" fill={accentColor} opacity="0.7" />
      <circle cx="58" cy="45" r="1" fill={accentColor} opacity="0.7" />
    </svg>
  );
};

// Animated Trotair Star Component
export const AnimatedTrotairStar = ({ className = "", size = 40, theme = "summer", opacity = 1, animate = true }) => {
  return (
    <div className={`${animate ? 'animate-pulse' : ''} ${className}`}>
      <TrotairStar size={size} theme={theme} opacity={opacity} />
    </div>
  );
};

// Background Star Motif Component
export const StarMotif = ({ theme, className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large background star */}
      <div className="absolute top-1/4 right-1/4 transform rotate-12">
        <TrotairStar size={200} theme={theme} opacity={0.1} />
      </div>
      
      {/* Medium stars */}
      <div className="absolute top-3/4 left-1/4 transform -rotate-12">
        <TrotairStar size={120} theme={theme} opacity={0.08} />
      </div>
      
      <div className="absolute top-1/2 right-1/3 transform rotate-45">
        <TrotairStar size={80} theme={theme} opacity={0.06} />
      </div>
      
      {/* Small accent stars */}
      <div className="absolute top-1/6 left-1/3 transform rotate-30">
        <TrotairStar size={40} theme={theme} opacity={0.05} />
      </div>
      
      <div className="absolute bottom-1/4 right-1/6 transform -rotate-30">
        <TrotairStar size={60} theme={theme} opacity={0.07} />
      </div>
    </div>
  );
};

// Mobile-first Header Component with Language and Currency Switchers
export const Header = ({ language, setLanguage, currency, setCurrency, theme, setTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const translations = {
    en: {
      flights: 'Flights',
      hotels: 'Hotels',
      cars: 'Cars',
      login: 'Sign in',
      signup: 'Create account',
      menu: 'Menu'
    },
    fr: {
      flights: 'Vols',
      hotels: 'Hôtels',
      cars: 'Voitures',
      login: 'Se connecter',
      signup: 'Créer un compte',
      menu: 'Menu'
    },
    ar: {
      flights: 'الطيران',
      hotels: 'الفنادق',
      cars: 'السيارات',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      menu: 'القائمة'
    }
  };

  const t = translations[language];

  return (
    <header className={`${theme === 'summer' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'} shadow-lg sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className={`text-xl md:text-2xl font-bold text-white`}>
              <span className="bg-white bg-opacity-20 px-3 md:px-4 py-2 rounded-lg">
                ✈️ Trotair
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <a href="#flights" className="text-white hover:text-gray-200 font-medium transition-colors">
              {t.flights}
            </a>
            <a href="#hotels" className="text-white hover:text-gray-200 font-medium transition-colors">
              {t.hotels}
            </a>
            <a href="#cars" className="text-white hover:text-gray-200 font-medium transition-colors">
              {t.cars}
            </a>
          </nav>
          
          {/* Controls */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-md px-2 md:px-3 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                <option value="en" className="text-gray-800">EN</option>
                <option value="fr" className="text-gray-800">FR</option>
                <option value="ar" className="text-gray-800">AR</option>
              </select>
            </div>
            
            {/* Currency Switcher */}
            <div className="relative">
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-md px-2 md:px-3 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                <option value="MAD" className="text-gray-800">MAD</option>
                <option value="EUR" className="text-gray-800">EUR</option>
                <option value="USD" className="text-gray-800">USD</option>
              </select>
            </div>
            
            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(theme === 'summer' ? 'winter' : 'summer')}
              className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-md px-2 md:px-3 py-1 text-xs md:text-sm hover:bg-opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              {theme === 'summer' ? '❄️' : '☀️'}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-md px-2 py-1 text-sm hover:bg-opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              {t.menu}
            </button>
            
            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <button className="text-white hover:text-gray-200 font-medium transition-colors text-sm">
                {t.login}
              </button>
              <button className="bg-white text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors text-sm">
                {t.signup}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-white border-opacity-20 mt-4 pt-4">
            <nav className="flex flex-col space-y-2">
              <a href="#flights" className="text-white hover:text-gray-200 font-medium transition-colors py-2">
                {t.flights}
              </a>
              <a href="#hotels" className="text-white hover:text-gray-200 font-medium transition-colors py-2">
                {t.hotels}
              </a>
              <a href="#cars" className="text-white hover:text-gray-200 font-medium transition-colors py-2">
                {t.cars}
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-white border-opacity-20">
                <button className="text-white hover:text-gray-200 font-medium transition-colors text-left py-2">
                  {t.login}
                </button>
                <button className="bg-white text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors text-left">
                  {t.signup}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Enhanced Hero Section with Real Flight Search
export const HeroSection = ({ language, currency, theme, onFlightResults }) => {
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    departure_date: '',
    return_date: '',
    passengers: 1,
    cabin_class: 'economy',
    tripType: 'roundtrip'
  });

  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const translations = {
    en: {
      title: 'Find Your Perfect Flight',
      subtitle: 'Your trusted travel partner for the Moroccan diaspora',
      from: 'From',
      to: 'To',
      departure: 'Departure',
      return: 'Return',
      passengers: 'Passengers',
      cabinClass: 'Cabin Class',
      search: 'Search Flights',
      searching: 'Searching...',
      roundtrip: 'Round Trip',
      oneway: 'One Way',
      anywhere: 'Airport Code (e.g., JFK)',
      anytime: 'Select Date',
      economy: 'Economy',
      premium: 'Premium Economy',
      business: 'Business',
      first: 'First Class'
    },
    fr: {
      title: 'Trouvez Votre Vol Parfait',
      subtitle: 'Votre partenaire de voyage de confiance pour la diaspora marocaine',
      from: 'De',
      to: 'Vers',
      departure: 'Départ',
      return: 'Retour',
      passengers: 'Passagers',
      cabinClass: 'Classe',
      search: 'Rechercher des Vols',
      searching: 'Recherche...',
      roundtrip: 'Aller-Retour',
      oneway: 'Aller Simple',
      anywhere: 'Code Aéroport (ex: CDG)',
      anytime: 'Choisir une date',
      economy: 'Économique',
      premium: 'Premium Économique',
      business: 'Affaires',
      first: 'Première Classe'
    },
    ar: {
      title: 'اعثر على رحلتك المثالية',
      subtitle: 'شريك السفر الموثوق للجالية المغربية',
      from: 'من',
      to: 'إلى',
      departure: 'المغادرة',
      return: 'العودة',
      passengers: 'المسافرون',
      cabinClass: 'الدرجة',
      search: 'البحث عن الرحلات',
      searching: 'يبحث...',
      roundtrip: 'ذهاب وإياب',
      oneway: 'ذهاب فقط',
      anywhere: 'كود المطار (مثال: CAI)',
      anytime: 'اختر التاريخ',
      economy: 'اقتصادية',
      premium: 'اقتصادية فاخرة',
      business: 'درجة رجال الأعمال',
      first: 'الدرجة الأولى'
    }
  };

  const t = translations[language];

  const handleSearch = async () => {
    if (!searchData.origin || !searchData.destination || !searchData.departure_date) {
      setSearchError('Please fill in all required fields');
      return;
    }

    setIsSearching(true);
    setSearchError('');
    
    try {
      const searchRequest = {
        origin: searchData.origin.toUpperCase(),
        destination: searchData.destination.toUpperCase(),
        departure_date: searchData.departure_date,
        return_date: searchData.tripType === 'roundtrip' ? searchData.return_date : null,
        passengers: searchData.passengers,
        cabin_class: searchData.cabin_class
      };

      const response = await axios.post(`${API}/flights/search`, searchRequest);
      
      if (response.data && response.data.data && response.data.data.offers) {
        onFlightResults(response.data.data.offers);
        // Scroll to results
        setTimeout(() => {
          document.getElementById('flight-results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setSearchError('No flights found for your search criteria');
      }
    } catch (error) {
      console.error('Flight search error:', error);
      setSearchError(error.response?.data?.detail || 'Failed to search flights. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Set minimum dates
  const today = new Date().toISOString().split('T')[0];
  const minReturnDate = searchData.departure_date || today;

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1605130284535-11dd9eedc58a')`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
            {t.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 md:mb-12 font-light">
            {t.subtitle}
          </p>
          
          {/* Flight Search Form */}
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
            {/* Trip Type Toggle */}
            <div className="flex justify-center mb-4 md:mb-6">
              <div className={`${theme === 'summer' ? 'bg-amber-100' : 'bg-emerald-100'} rounded-lg p-1 flex`}>
                <button
                  onClick={() => setSearchData({...searchData, tripType: 'roundtrip'})}
                  className={`px-4 md:px-6 py-2 rounded-md font-medium transition-all text-sm md:text-base ${
                    searchData.tripType === 'roundtrip'
                      ? theme === 'summer' 
                        ? 'bg-amber-500 text-white shadow-md' 
                        : 'bg-emerald-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {t.roundtrip}
                </button>
                <button
                  onClick={() => setSearchData({...searchData, tripType: 'oneway'})}
                  className={`px-4 md:px-6 py-2 rounded-md font-medium transition-all text-sm md:text-base ${
                    searchData.tripType === 'oneway'
                      ? theme === 'summer' 
                        ? 'bg-amber-500 text-white shadow-md' 
                        : 'bg-emerald-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {t.oneway}
                </button>
              </div>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.from}</label>
                <input
                  type="text"
                  placeholder={t.anywhere}
                  value={searchData.origin}
                  onChange={(e) => setSearchData({...searchData, origin: e.target.value})}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.to}</label>
                <input
                  type="text"
                  placeholder={t.anywhere}
                  value={searchData.destination}
                  onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.departure}</label>
                <input
                  type="date"
                  min={today}
                  value={searchData.departure_date}
                  onChange={(e) => setSearchData({...searchData, departure_date: e.target.value})}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                />
              </div>
              
              {searchData.tripType === 'roundtrip' && (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.return}</label>
                  <input
                    type="date"
                    min={minReturnDate}
                    value={searchData.return_date}
                    onChange={(e) => setSearchData({...searchData, return_date: e.target.value})}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.passengers}</label>
                <select
                  value={searchData.passengers}
                  onChange={(e) => setSearchData({...searchData, passengers: parseInt(e.target.value)})}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'passenger' : 'passengers'}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.cabinClass}</label>
                <select
                  value={searchData.cabin_class}
                  onChange={(e) => setSearchData({...searchData, cabin_class: e.target.value})}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                >
                  <option value="economy">{t.economy}</option>
                  <option value="premium_economy">{t.premium}</option>
                  <option value="business">{t.business}</option>
                  <option value="first">{t.first}</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className={`w-full ${theme === 'summer' ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'} text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  {isSearching ? t.searching : t.search}
                </button>
              </div>
            </div>

            {searchError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                {searchError}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Flight Results Component
export const FlightResults = ({ flights, language, currency, theme, onBookFlight }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const translations = {
    en: {
      results: 'Flight Results',
      noResults: 'No flights found. Please try different search criteria.',
      selectFlight: 'Select Flight',
      bookNow: 'Book Now',
      duration: 'Duration',
      stops: 'stops',
      stop: 'stop',
      direct: 'Direct',
      departure: 'Departure',
      arrival: 'Arrival',
      airline: 'Airline',
      price: 'Price',
      perPerson: 'per person'
    },
    fr: {
      results: 'Résultats de Vol',
      noResults: 'Aucun vol trouvé. Veuillez essayer d\'autres critères de recherche.',
      selectFlight: 'Sélectionner le Vol',
      bookNow: 'Réserver Maintenant',
      duration: 'Durée',
      stops: 'escales',
      stop: 'escale',
      direct: 'Direct',
      departure: 'Départ',
      arrival: 'Arrivée',
      airline: 'Compagnie',
      price: 'Prix',
      perPerson: 'par personne'
    },
    ar: {
      results: 'نتائج الرحلات',
      noResults: 'لم يتم العثور على رحلات. يرجى تجربة معايير بحث مختلفة.',
      selectFlight: 'اختر الرحلة',
      bookNow: 'احجز الآن',
      duration: 'المدة',
      stops: 'توقفات',
      stop: 'توقف',
      direct: 'مباشر',
      departure: 'المغادرة',
      arrival: 'الوصول',
      airline: 'شركة الطيران',
      price: 'السعر',
      perPerson: 'للفرد'
    }
  };

  const t = translations[language];

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    const hours = match[1] ? match[1].replace('H', 'h ') : '';
    const minutes = match[2] ? match[2].replace('M', 'm') : '';
    return hours + minutes;
  };

  const formatTime = (datetime) => {
    return new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (datetime) => {
    return new Date(datetime).toLocaleDateString();
  };

  const getStopsText = (segments) => {
    const stops = segments.length - 1;
    if (stops === 0) return t.direct;
    if (stops === 1) return `1 ${t.stop}`;
    return `${stops} ${t.stops}`;
  };

  if (!flights || flights.length === 0) {
    return (
      <section id="flight-results" className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.results}</h2>
            <p className="text-gray-600">{t.noResults}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="flight-results" className="py-8 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
          {t.results}
        </h2>
        
        <div className="space-y-4 md:space-y-6">
          {flights.map((flight, index) => (
            <div key={flight.id || index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-4 md:p-6">
                {/* Flight Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div className="mb-2 md:mb-0">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">{flight.owner?.name}</h3>
                    <p className="text-sm text-gray-600">{t.airline}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl md:text-3xl font-bold ${theme === 'summer' ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {currency} {parseFloat(flight.total_amount).toFixed(2)}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">{t.perPerson}</p>
                  </div>
                </div>

                {/* Flight Slices */}
                <div className="space-y-4">
                  {flight.slices?.map((slice, sliceIndex) => (
                    <div key={sliceIndex} className="border border-gray-200 rounded-lg p-3 md:p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        {/* Departure */}
                        <div className="text-center md:text-left">
                          <div className="text-lg md:text-xl font-bold">
                            {formatTime(slice.segments[0]?.departing_at)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {slice.segments[0]?.origin?.iata_code}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(slice.segments[0]?.departing_at)}
                          </div>
                        </div>

                        {/* Flight Info */}
                        <div className="text-center">
                          <div className="text-sm text-gray-600">
                            {formatDuration(slice.duration)}
                          </div>
                          <div className="flex items-center justify-center my-2">
                            <div className="h-0.5 bg-gray-300 flex-1"></div>
                            <div className="mx-2 text-xs text-gray-500">
                              ✈️
                            </div>
                            <div className="h-0.5 bg-gray-300 flex-1"></div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {getStopsText(slice.segments)}
                          </div>
                        </div>

                        {/* Arrival */}
                        <div className="text-center md:text-right">
                          <div className="text-lg md:text-xl font-bold">
                            {formatTime(slice.segments[slice.segments.length - 1]?.arriving_at)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {slice.segments[slice.segments.length - 1]?.destination?.iata_code}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(slice.segments[slice.segments.length - 1]?.arriving_at)}
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="text-center md:text-right">
                          <button
                            onClick={() => onBookFlight(flight)}
                            className={`w-full md:w-auto ${theme === 'summer' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'} text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base`}
                          >
                            {t.bookNow}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Payment Modal Component
export const PaymentModal = ({ flight, language, currency, theme, isOpen, onClose, onPaymentSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const translations = {
    en: {
      bookingDetails: 'Booking Details',
      flight: 'Flight',
      total: 'Total',
      payNow: 'Pay Now',
      processing: 'Processing...',
      close: 'Close',
      securePayment: 'Secure Payment with Stripe'
    },
    fr: {
      bookingDetails: 'Détails de la Réservation',
      flight: 'Vol',
      total: 'Total',
      payNow: 'Payer Maintenant',
      processing: 'Traitement...',
      close: 'Fermer',
      securePayment: 'Paiement Sécurisé avec Stripe'
    },
    ar: {
      bookingDetails: 'تفاصيل الحجز',
      flight: 'الرحلة',
      total: 'المجموع',
      payNow: 'ادفع الآن',
      processing: 'معالجة...',
      close: 'إغلاق',
      securePayment: 'دفع آمن مع Stripe'
    }
  };

  const t = translations[language];

  const handlePayment = async () => {
    if (!flight) return;

    setIsProcessing(true);
    setPaymentError('');

    try {
      const paymentRequest = {
        flight_offer_id: flight.id,
        amount: parseFloat(flight.total_amount),
        currency: flight.total_currency.toLowerCase(),
        origin_url: window.location.origin,
        metadata: {
          flight_owner: flight.owner?.name || 'Unknown',
          passenger_count: flight.passengers?.length || 1
        }
      };

      const response = await axios.post(`${API}/payments/v1/checkout/session`, paymentRequest);
      
      if (response.data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = response.data.url;
      } else {
        throw new Error('No payment URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error.response?.data?.detail || 'Failed to process payment. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!isOpen || !flight) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{t.bookingDetails}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{t.flight}</h3>
              <p className="text-sm text-gray-600">{flight.owner?.name}</p>
              {flight.slices?.map((slice, index) => (
                <div key={index} className="text-sm text-gray-600 mt-1">
                  {slice.segments[0]?.origin?.iata_code} → {slice.segments[slice.segments.length - 1]?.destination?.iata_code}
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{t.total}</span>
                <span className={`text-2xl font-bold ${theme === 'summer' ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {currency} {parseFloat(flight.total_amount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {paymentError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {paymentError}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full ${theme === 'summer' ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'} text-white py-3 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isProcessing ? t.processing : t.payNow}
            </button>

            <button
              onClick={onClose}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              {t.close}
            </button>

            <p className="text-xs text-gray-500 text-center">
              🔒 {t.securePayment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile-optimized Featured Destinations Section
export const FeaturedDestinations = ({ language, currency, theme }) => {
  const translations = {
    en: {
      title: 'Popular Destinations',
      subtitle: 'Discover amazing places with unbeatable prices',
      viewDeals: 'View Deals',
      from: 'from'
    },
    fr: {
      title: 'Destinations Populaires',
      subtitle: 'Découvrez des endroits incroyables avec des prix imbattables',
      viewDeals: 'Voir les Offres',
      from: 'à partir de'
    },
    ar: {
      title: 'الوجهات الشعبية',
      subtitle: 'اكتشف أماكن رائعة بأسعار لا تُقاوم',
      viewDeals: 'عرض العروض',
      from: 'من'
    }
  };

  const t = translations[language];

  const destinations = [
    {
      name: 'Morocco',
      city: 'Marrakech',
      image: 'https://images.unsplash.com/photo-1661987284979-23568e5f0023',
      price: currency === 'MAD' ? '1,200' : currency === 'EUR' ? '120' : '130'
    },
    {
      name: 'Europe',
      city: 'Mediterranean Coast',
      image: 'https://images.unsplash.com/photo-1660851971505-bba6f8db80a2',
      price: currency === 'MAD' ? '2,500' : currency === 'EUR' ? '250' : '280'
    },
    {
      name: 'Middle East',
      city: 'Dubai',
      image: 'https://images.unsplash.com/photo-1720173438118-a6c4d5a565da',
      price: currency === 'MAD' ? '1,800' : currency === 'EUR' ? '180' : '200'
    }
  ];

  const currencySymbol = currency === 'MAD' ? 'MAD' : currency === 'EUR' ? '€' : '$';

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {destinations.map((destination, index) => (
            <div key={index} className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg md:text-xl font-bold">{destination.city}</h3>
                  <p className="text-sm md:text-base text-gray-200">{destination.name}</p>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm">{t.from}</p>
                    <p className={`text-xl md:text-2xl font-bold ${theme === 'summer' ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {currencySymbol}{destination.price}
                    </p>
                  </div>
                  <button className={`${theme === 'summer' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'} text-white px-4 md:px-6 py-2 rounded-lg font-medium transition-colors text-sm md:text-base`}>
                    {t.viewDeals}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Mobile-optimized About Section
export const AboutSection = ({ language, theme }) => {
  const translations = {
    en: {
      title: 'About Trotair',
      subtitle: 'Your trusted travel partner for the Moroccan diaspora',
      description: 'Trotair is a modern, customer-first travel agency dedicated to serving the Moroccan diaspora worldwide. We understand the unique needs of Moroccan travelers and provide personalized service, competitive prices, and cultural understanding.',
      features: [
        'Specialized in Moroccan diaspora travel',
        'Multilingual customer support',
        'Competitive pricing and deals',
        'Cultural understanding and expertise'
      ],
      support: '24/7 Customer Support',
      supportDesc: 'Our dedicated team is here to help you anytime, anywhere.'
    },
    fr: {
      title: 'À Propos de Trotair',
      subtitle: 'Votre partenaire de voyage de confiance pour la diaspora marocaine',
      description: 'Trotair est une agence de voyage moderne, axée sur le client, dédiée au service de la diaspora marocaine dans le monde entier. Nous comprenons les besoins uniques des voyageurs marocains et offrons un service personnalisé, des prix compétitifs et une compréhension culturelle.',
      features: [
        'Spécialisé dans les voyages de la diaspora marocaine',
        'Support client multilingue',
        'Prix compétitifs et offres',
        'Compréhension et expertise culturelle'
      ],
      support: 'Support Client 24/7',
      supportDesc: 'Notre équipe dédiée est là pour vous aider à tout moment, n\'importe où.'
    },
    ar: {
      title: 'حول تروتير',
      subtitle: 'شريك السفر الموثوق للجالية المغربية',
      description: 'تروتير هي وكالة سفر حديثة تركز على العملاء ومخصصة لخدمة الجالية المغربية في جميع أنحاء العالم. نحن نفهم الاحتياجات الفريدة للمسافرين المغاربة ونقدم خدمة شخصية وأسعار تنافسية وفهم ثقافي.',
      features: [
        'متخصص في سفر الجالية المغربية',
        'دعم العملاء متعدد اللغات',
        'أسعار تنافسية وعروض',
        'فهم وخبرة ثقافية'
      ],
      support: 'دعم العملاء 24/7',
      supportDesc: 'فريقنا المخصص هنا لمساعدتك في أي وقت وفي أي مكان.'
    }
  };

  const t = translations[language];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              {t.title}
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
              {t.description}
            </p>
            
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {t.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${theme === 'summer' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  <span className="text-sm md:text-base text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <img
                src="https://images.unsplash.com/photo-1566286633173-3da9c7825746"
                alt="Happy travelers"
                className="rounded-xl md:rounded-2xl shadow-lg w-full h-32 md:h-48 object-cover"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1656058039604-8346721fda70"
                alt="Adventure travelers"
                className="rounded-xl md:rounded-2xl shadow-lg mt-4 md:mt-8 w-full h-32 md:h-48 object-cover"
                loading="lazy"
              />
            </div>
            
            <div className={`absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 ${theme === 'summer' ? 'bg-amber-500' : 'bg-emerald-500'} text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl max-w-xs`}>
              <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2">{t.support}</h3>
              <p className="text-xs md:text-sm opacity-90">{t.supportDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Mobile-optimized Payment Section
export const PaymentSection = ({ language, theme }) => {
  const translations = {
    en: {
      title: 'Secure Payment Options',
      subtitle: 'Book with confidence using your preferred payment method',
      international: 'International Payments',
      moroccan: 'Moroccan Payment Methods',
      security: 'Your payment information is protected with bank-level security'
    },
    fr: {
      title: 'Options de Paiement Sécurisées',
      subtitle: 'Réservez en toute confiance avec votre méthode de paiement préférée',
      international: 'Paiements Internationaux',
      moroccan: 'Méthodes de Paiement Marocaines',
      security: 'Vos informations de paiement sont protégées avec une sécurité de niveau bancaire'
    },
    ar: {
      title: 'خيارات الدفع الآمنة',
      subtitle: 'احجز بثقة باستخدام طريقة الدفع المفضلة لديك',
      international: 'المدفوعات الدولية',
      moroccan: 'طرق الدفع المغربية',
      security: 'معلومات الدفع الخاصة بك محمية بأمان مصرفي'
    }
  };

  const t = translations[language];

  const paymentMethods = [
    { name: 'Visa', logo: '💳' },
    { name: 'Mastercard', logo: '💳' },
    { name: 'American Express', logo: '💳' },
    { name: 'PayPal', logo: '💰' },
    { name: 'CIH Bank', logo: '🏦' },
    { name: 'BMCE Bank', logo: '🏦' },
    { name: 'Attijariwafa Bank', logo: '🏦' },
    { name: 'Cash Plus', logo: '💸' }
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 ${theme === 'summer' ? 'text-amber-600' : 'text-emerald-600'}`}>
              {t.international}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {paymentMethods.slice(0, 4).map((method, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 md:p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <span className="text-xl md:text-2xl">{method.logo}</span>
                  <span className="font-medium text-gray-700 text-sm md:text-base">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className={`text-lg md:text-xl font-bold mb-4 md:mb-6 ${theme === 'summer' ? 'text-amber-600' : 'text-emerald-600'}`}>
              {t.moroccan}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {paymentMethods.slice(4).map((method, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 md:p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <span className="text-xl md:text-2xl">{method.logo}</span>
                  <span className="font-medium text-gray-700 text-sm md:text-base">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <span className="text-xl md:text-2xl">🔒</span>
            <span className="text-sm md:text-base">{t.security}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Mobile-optimized Footer Component
export const Footer = ({ language, theme }) => {
  const translations = {
    en: {
      tagline: 'Your trusted travel partner',
      company: 'Company',
      about: 'About Us',
      careers: 'Careers',
      press: 'Press',
      blog: 'Blog',
      support: 'Support',
      contact: 'Contact',
      help: 'Help Center',
      faq: 'FAQ',
      legal: 'Legal',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      rights: 'All rights reserved.',
      followUs: 'Follow Us'
    },
    fr: {
      tagline: 'Votre partenaire de voyage de confiance',
      company: 'Entreprise',
      about: 'À Propos',
      careers: 'Carrières',
      press: 'Presse',
      blog: 'Blog',
      support: 'Support',
      contact: 'Contact',
      help: 'Centre d\'Aide',
      faq: 'FAQ',
      legal: 'Légal',
      terms: 'Conditions d\'Utilisation',
      privacy: 'Politique de Confidentialité',
      cookies: 'Politique de Cookies',
      rights: 'Tous droits réservés.',
      followUs: 'Suivez-Nous'
    },
    ar: {
      tagline: 'شريك السفر الموثوق',
      company: 'الشركة',
      about: 'من نحن',
      careers: 'الوظائف',
      press: 'الصحافة',
      blog: 'المدونة',
      support: 'الدعم',
      contact: 'اتصل بنا',
      help: 'مركز المساعدة',
      faq: 'الأسئلة الشائعة',
      legal: 'قانوني',
      terms: 'شروط الخدمة',
      privacy: 'سياسة الخصوصية',
      cookies: 'سياسة ملفات تعريف الارتباط',
      rights: 'جميع الحقوق محفوظة.',
      followUs: 'تابعنا'
    }
  };

  const t = translations[language];

  return (
    <footer className={`${theme === 'summer' ? 'bg-gradient-to-r from-amber-900 to-orange-900' : 'bg-gradient-to-r from-emerald-900 to-teal-900'} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
              ✈️ Trotair
            </div>
            <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
              {t.tagline}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg md:text-xl">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg md:text-xl">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg md:text-xl">
                <span className="sr-only">Instagram</span>
                📷
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-lg md:text-xl">
                <span className="sr-only">LinkedIn</span>
                💼
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">{t.company}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">{t.about}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">{t.careers}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">{t.press}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">{t.blog}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">{t.support}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">{t.contact}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">{t.help}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">{t.faq}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">{t.legal}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">{t.terms}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">{t.privacy}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">{t.cookies}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <p className="text-gray-300 text-xs md:text-sm">
            © 2025 Trotair. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

// Payment Success/Failure Components
export const PaymentStatus = ({ language, theme }) => {
  const [paymentStatus, setPaymentStatus] = useState('checking');
  const [sessionId, setSessionId] = useState('');

  const translations = {
    en: {
      checking: 'Checking payment status...',
      success: 'Payment Successful!',
      failed: 'Payment Failed',
      successMessage: 'Thank you for your booking. You will receive a confirmation email shortly.',
      failedMessage: 'There was an issue processing your payment. Please try again.',
      backToHome: 'Back to Home'
    },
    fr: {
      checking: 'Vérification du statut de paiement...',
      success: 'Paiement Réussi!',
      failed: 'Paiement Échoué',
      successMessage: 'Merci pour votre réservation. Vous recevrez un email de confirmation sous peu.',
      failedMessage: 'Il y a eu un problème lors du traitement de votre paiement. Veuillez réessayer.',
      backToHome: 'Retour à l\'Accueil'
    },
    ar: {
      checking: 'التحقق من حالة الدفع...',
      success: 'تم الدفع بنجاح!',
      failed: 'فشل الدفع',
      successMessage: 'شكراً لك على حجزك. ستتلقى بريد إلكتروني للتأكيد قريباً.',
      failedMessage: 'حدثت مشكلة في معالجة دفعتك. يرجى المحاولة مرة أخرى.',
      backToHome: 'العودة إلى الصفحة الرئيسية'
    }
  };

  const t = translations[language];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const session_id = urlParams.get('session_id');
    
    if (session_id) {
      setSessionId(session_id);
      checkPaymentStatus(session_id);
    } else {
      setPaymentStatus('failed');
    }
  }, []);

  const checkPaymentStatus = async (sessionId, attempts = 0) => {
    const maxAttempts = 5;
    
    if (attempts >= maxAttempts) {
      setPaymentStatus('failed');
      return;
    }

    try {
      const response = await axios.get(`${API}/payments/v1/checkout/status/${sessionId}`);
      
      if (response.data.payment_status === 'paid') {
        setPaymentStatus('success');
      } else if (response.data.status === 'expired') {
        setPaymentStatus('failed');
      } else {
        // Still pending, check again after 2 seconds
        setTimeout(() => checkPaymentStatus(sessionId, attempts + 1), 2000);
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      if (attempts < maxAttempts - 1) {
        setTimeout(() => checkPaymentStatus(sessionId, attempts + 1), 2000);
      } else {
        setPaymentStatus('failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
        {paymentStatus === 'checking' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{t.checking}</h2>
          </>
        )}
        
        {paymentStatus === 'success' && (
          <>
            <div className="text-green-500 text-5xl mb-4">✅</div>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'summer' ? 'text-amber-600' : 'text-emerald-600'}`}>
              {t.success}
            </h2>
            <p className="text-gray-600 mb-6">{t.successMessage}</p>
          </>
        )}
        
        {paymentStatus === 'failed' && (
          <>
            <div className="text-red-500 text-5xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">{t.failed}</h2>
            <p className="text-gray-600 mb-6">{t.failedMessage}</p>
          </>
        )}
        
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