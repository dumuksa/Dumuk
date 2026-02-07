import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LogisticsDetails } from './components/LogisticsDetails';
import { LithiumDetails } from './components/LithiumDetails';
import { translations } from './translations';

export type ViewState = 'home' | 'logistics' | 'lithium';
export type Language = 'ar' | 'en';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [lang, setLang] = useState<Language>('ar');
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className={`relative min-h-screen bg-brand-dark text-white selection:bg-brand-green selection:text-black font-sans ${t.dir === 'rtl' ? 'font-sans' : 'font-inter'}`}>
      
      {/* Global Animated Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-blue/10 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-green/10 blur-[120px] rounded-full animate-blob [animation-delay:2s]"></div>
        <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-brand-blue/5 blur-[100px] rounded-full animate-blob [animation-delay:4s]"></div>
        <div className="absolute bottom-[30%] left-[20%] w-[40%] h-[40%] bg-brand-green/5 blur-[100px] rounded-full animate-blob [animation-delay:6s]"></div>
        
        {/* Subtle grid pattern for extra detail */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <Navbar setView={setCurrentView} currentView={currentView} lang={lang} toggleLanguage={toggleLanguage} />
      
      <main className="relative z-10">
        {currentView === 'home' && (
          <>
            <Hero lang={lang} />
            <Services setView={setCurrentView} lang={lang} />
            <WhyUs lang={lang} />
            <FAQ lang={lang} />
            <Contact lang={lang} />
          </>
        )}

        {currentView === 'logistics' && (
          <>
            <LogisticsDetails onBack={() => setCurrentView('home')} lang={lang} />
            <Contact lang={lang} />
          </>
        )}

        {currentView === 'lithium' && (
          <>
            <LithiumDetails onBack={() => setCurrentView('home')} lang={lang} />
            <Contact lang={lang} />
          </>
        )}
      </main>

      <Footer lang={lang} />
    </div>
  );
}

export default App;