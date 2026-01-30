import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { ViewState, Language } from '../App';
import { translations } from '../translations';

interface NavbarProps {
  setView: (view: ViewState) => void;
  currentView: ViewState;
  lang: Language;
  toggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setView, currentView, lang, toggleLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#hero', action: () => setView('home') },
    { name: t.nav.services, href: '#services', action: () => setView('home') },
    { name: t.nav.whyUs, href: '#why-us', action: () => setView('home') },
    { name: t.nav.faq, href: '#faq', action: () => setView('home') },
    { name: t.nav.contact, href: '#contact', action: () => {} },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();
    if (link.action) link.action();
    setTimeout(() => {
        const element = document.querySelector(link.href);
        if (element) {
            const offset = 100; 
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        } else if (link.href === '#hero' && currentView === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    }, 100);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen || currentView !== 'home' ? 'bg-brand-dark/90 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          <div className="flex items-center gap-12">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => { setView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
              <Logo lang={lang} />
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-gray-300 hover:text-brand-green font-medium text-base transition-colors duration-200 relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-brand-green transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              <Globe size={18} />
              <span className="text-sm font-bold uppercase">{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>
            <button 
               onClick={() => {
                   const contact = document.querySelector('#contact');
                   if(contact) contact.scrollIntoView({behavior: 'smooth'});
               }}
               className="bg-gradient-to-r from-brand-blue to-brand-green text-white px-6 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(5,51,156,0.3)] hover:shadow-[0_0_30px_rgba(65,166,126,0.4)] transition-all transform hover:scale-105"
             >
                {t.nav.request}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button onClick={toggleLanguage} className="p-2 text-gray-300 hover:text-white">
              <Globe size={20} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-brand-dark border-b border-white/10 absolute w-full left-0 top-24 animate-fade-in-down">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-gray-300 hover:text-brand-green block px-3 py-2 rounded-md text-lg font-medium transition-colors ${lang === 'ar' ? 'text-right' : 'text-left'}`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex justify-center">
                 <button 
                    onClick={() => {
                        setIsMenuOpen(false);
                        const contact = document.querySelector('#contact');
                        if(contact) contact.scrollIntoView({behavior: 'smooth'});
                    }}
                    className="w-full bg-gradient-to-r from-brand-blue to-brand-green text-white px-5 py-4 rounded-xl font-bold text-lg shadow-lg"
                 >
                {t.nav.request}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};