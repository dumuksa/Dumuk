import React from 'react';
import { Logo } from './Logo';
import { Language } from '../App';
import { translations } from '../translations';
import { Mail, Phone } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];
  return (
    <footer className="bg-brand-dark/95 backdrop-blur-xl py-8 border-t border-white/10 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <Logo className="scale-75" lang={lang} />
            <p className="text-gray-500 text-xs">{t.footer.rights}</p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="tel:+966558549944" className="flex items-center gap-2 text-gray-400 hover:text-brand-green transition-colors">
              <Phone size={16} />
              <span className="font-mono text-xs">
                <bdi>+966-55-854-9944</bdi>
              </span>
            </a>
            <a href="mailto:dumuksa@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-brand-blue transition-colors">
              <Mail size={16} />
              <span className="text-xs">dumuksa@gmail.com</span>
            </a>
            <div className="flex gap-4 text-gray-500">
              <a href="#" className="hover:text-white transition-colors text-xs">{t.footer.privacy}</a>
              <a href="#" className="hover:text-white transition-colors text-xs">{t.footer.terms}</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};