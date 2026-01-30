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
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo className="scale-75 origin-right" lang={lang} />
            <p className="text-gray-500 text-sm mt-2">{t.footer.rights}</p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4 text-gray-400">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">{t.nav.contact}</h4>
            <a href="tel:+966558549944" className="flex items-center gap-3 hover:text-brand-green transition-colors">
              <Phone size={18} />
              <span className="font-mono">+966 55 854 9944</span>
            </a>
            <a href="mailto:dumuksa@gmail.com" className="flex items-center gap-3 hover:text-brand-blue transition-colors">
              <Mail size={18} />
              <span>dumuksa@gmail.com</span>
            </a>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6 h-full justify-center">
            <div className="flex gap-6">
               <a href="#" className="text-gray-500 hover:text-white transition-colors">{t.footer.privacy}</a>
               <a href="#" className="text-gray-500 hover:text-white transition-colors">{t.footer.terms}</a>
            </div>
            <div className="flex gap-4">
               {/* Social placeholders if needed */}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};