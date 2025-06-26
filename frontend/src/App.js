import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Header, 
  HeroSection, 
  FeaturedDestinations, 
  AboutSection, 
  PaymentSection, 
  Footer 
} from './components';

function App() {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('EUR');
  const [theme, setTheme] = useState('summer'); // summer (yellow/warm) or winter (green/cool)

  // Auto-detect theme based on current month (June = summer)
  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1; // 1-12
    // Summer months: June, July, August, September (6-9)
    // Winter months: October, November, December, January, February, March, April, May (10-12, 1-5)
    const isSummer = currentMonth >= 6 && currentMonth <= 9;
    setTheme(isSummer ? 'summer' : 'winter');
  }, []);

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
      />
      
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
    </div>
  );
}

export default App;