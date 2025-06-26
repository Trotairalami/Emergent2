import React, { useState, useEffect } from 'react';

// Header Component with Language and Currency Switchers
export const Header = ({ language, setLanguage, currency, setCurrency, theme, setTheme }) => {
  const translations = {
    en: {
      flights: 'Flights',
      hotels: 'Hotels',
      cars: 'Cars',
      login: 'Sign in',
      signup: 'Create account'
    },
    fr: {
      flights: 'Vols',
      hotels: 'Hôtels',
      cars: 'Voitures',
      login: 'Se connecter',
      signup: 'Créer un compte'
    },
    ar: {
      flights: 'الطيران',
      hotels: 'الفنادق',
      cars: 'السيارات',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب'
    }
  };

  const t = translations[language];

  return (
    <header className={`${theme === 'summer' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className={`text-2xl font-bold text-white mr-8`}>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                ✈️ Trotair
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-white hover:text-gray-200 font-medium transition-colors">
                {t.flights}
              </a>
              <a href="#" className="text-white hover:text-gray-200 font-medium transition-colors">
                {t.hotels}
              </a>
              <a href="#" className="text-white hover:text-gray-200 font-medium transition-colors">
                {t.cars}
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                <option value="en" className="text-gray-800">English</option>
                <option value="fr" className="text-gray-800">Français</option>
                <option value="ar" className="text-gray-800">العربية</option>
              </select>
            </div>
            
            {/* Currency Switcher */}
            <div className="relative">
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                <option value="MAD" className="text-gray-800">MAD</option>
                <option value="EUR" className="text-gray-800">EUR</option>
                <option value="USD" className="text-gray-800">USD</option>
              </select>
            </div>
            
            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(theme === 'summer' ? 'winter' : 'summer')}
              className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-md px-3 py-1 text-sm hover:bg-opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              {theme === 'summer' ? '❄️' : '☀️'}
            </button>
            
            <div className="hidden md:flex items-center space-x-3">
              <button className="text-white hover:text-gray-200 font-medium transition-colors">
                {t.login}
              </button>
              <button className="bg-white text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                {t.signup}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section with Flight Search
export const HeroSection = ({ language, currency, theme }) => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
    tripType: 'roundtrip'
  });

  const translations = {
    en: {
      title: 'Find Your Perfect Flight',
      subtitle: 'Your trusted travel partner for the Moroccan diaspora',
      from: 'From',
      to: 'To',
      departure: 'Departure',
      return: 'Return',
      passengers: 'Passengers',
      search: 'Search Flights',
      roundtrip: 'Round Trip',
      oneway: 'One Way',
      anywhere: 'Anywhere',
      anytime: 'Anytime'
    },
    fr: {
      title: 'Trouvez Votre Vol Parfait',
      subtitle: 'Votre partenaire de voyage de confiance pour la diaspora marocaine',
      from: 'De',
      to: 'Vers',
      departure: 'Départ',
      return: 'Retour',
      passengers: 'Passagers',
      search: 'Rechercher des Vols',
      roundtrip: 'Aller-Retour',
      oneway: 'Aller Simple',
      anywhere: 'N\'importe où',
      anytime: 'N\'importe quand'
    },
    ar: {
      title: 'اعثر على رحلتك المثالية',
      subtitle: 'شريك السفر الموثوق للجالية المغربية',
      from: 'من',
      to: 'إلى',
      departure: 'المغادرة',
      return: 'العودة',
      passengers: 'المسافرون',
      search: 'البحث عن الرحلات',
      roundtrip: 'ذهاب وإياب',
      oneway: 'ذهاب فقط',
      anywhere: 'أي مكان',
      anytime: 'أي وقت'
    }
  };

  const t = translations[language];

  const handleSearch = () => {
    console.log('Searching flights with:', searchData);
    // This would typically send the search data to an API
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1605130284535-11dd9eedc58a')`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 font-light">
            {t.subtitle}
          </p>
          
          {/* Flight Search Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto">
            {/* Trip Type Toggle */}
            <div className="flex justify-center mb-6">
              <div className={`${theme === 'summer' ? 'bg-amber-100' : 'bg-emerald-100'} rounded-lg p-1 flex`}>
                <button
                  onClick={() => setSearchData({...searchData, tripType: 'roundtrip'})}
                  className={`px-6 py-2 rounded-md font-medium transition-all ${
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
                  className={`px-6 py-2 rounded-md font-medium transition-all ${
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.from}</label>
                <input
                  type="text"
                  placeholder={t.anywhere}
                  value={searchData.from}
                  onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.to}</label>
                <input
                  type="text"
                  placeholder={t.anywhere}
                  value={searchData.to}
                  onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.departure}</label>
                <input
                  type="date"
                  value={searchData.departure}
                  onChange={(e) => setSearchData({...searchData, departure: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
              </div>
              
              {searchData.tripType === 'roundtrip' && (
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.return}</label>
                  <input
                    type="date"
                    value={searchData.return}
                    onChange={(e) => setSearchData({...searchData, return: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.passengers}</label>
                <select
                  value={searchData.passengers}
                  onChange={(e) => setSearchData({...searchData, passengers: parseInt(e.target.value)})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'passenger' : 'passengers'}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleSearch}
                className={`${theme === 'summer' ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'} text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
              >
                {t.search}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Featured Destinations Section
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{destination.city}</h3>
                  <p className="text-gray-200">{destination.name}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm">{t.from}</p>
                    <p className={`text-2xl font-bold ${theme === 'summer' ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {currencySymbol}{destination.price}
                    </p>
                  </div>
                  <button className={`${theme === 'summer' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'} text-white px-6 py-2 rounded-lg font-medium transition-colors`}>
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

// About Trotair Section
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t.description}
            </p>
            
            <div className="space-y-4 mb-8">
              {t.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${theme === 'summer' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1566286633173-3da9c7825746"
                alt="Happy travelers"
                className="rounded-2xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1656058039604-8346721fda70"
                alt="Adventure travelers"
                className="rounded-2xl shadow-lg mt-8"
              />
            </div>
            
            <div className={`absolute -bottom-6 -left-6 ${theme === 'summer' ? 'bg-amber-500' : 'bg-emerald-500'} text-white p-6 rounded-2xl shadow-xl`}>
              <h3 className="font-bold text-lg mb-2">{t.support}</h3>
              <p className="text-sm opacity-90">{t.supportDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Payment Options Section
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className={`text-xl font-bold mb-6 ${theme === 'summer' ? 'text-amber-600' : 'text-emerald-600'}`}>
              {t.international}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.slice(0, 4).map((method, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <span className="text-2xl">{method.logo}</span>
                  <span className="font-medium text-gray-700">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className={`text-xl font-bold mb-6 ${theme === 'summer' ? 'text-amber-600' : 'text-emerald-600'}`}>
              {t.moroccan}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.slice(4).map((method, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <span className="text-2xl">{method.logo}</span>
                  <span className="font-medium text-gray-700">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <span className="text-2xl">🔒</span>
            <span>{t.security}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-bold mb-4">
              ✈️ Trotair
            </div>
            <p className="text-gray-300 mb-6">
              {t.tagline}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                📷
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                💼
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">{t.company}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t.about}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t.careers}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t.press}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t.blog}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">{t.support}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t.contact}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t.help}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t.faq}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">{t.legal}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t.terms}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t.privacy}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t.cookies}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Trotair. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};