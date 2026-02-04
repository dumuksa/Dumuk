import React from 'react';
import { Language } from '../App';
import { translations } from '../translations';
import logoImg from '/logo-light.svg';

interface LogoProps {
  className?: string;
  lang?: Language;
}

export const Logo: React.FC<LogoProps> = ({ className, lang = 'ar' }) => {
  const t = translations[lang];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`relative w-8 h-8 self-center ${lang === 'ar' ? 'translate-y-[3px]' : '' }`}>
        <img
          src={logoImg}
          alt={t.brandName}
          className="w-full h-full"
        />
      </div>

      <span className="text-2xl font-bold leading-none text-white tracking-tight">
        {t.brandName}
      </span>
    </div>
  );
};
