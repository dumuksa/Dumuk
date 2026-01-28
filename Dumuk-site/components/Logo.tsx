import React from 'react';
import { Language } from '../App';
import { translations } from '../translations';

interface LogoProps {
  className?: string;
  lang?: Language;
}

export const Logo: React.FC<LogoProps> = ({ className, lang = 'ar' }) => {
  const t = translations[lang];
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-11 h-11">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#05339C" />
              <stop offset="100%" stopColor="#41A67E" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" opacity="0.1" />
          <path 
            d="M30 10 H60 C85 10 95 30 95 50 C95 75 85 90 60 90 H30 V10 Z" 
            stroke="url(#logoGradient)" 
            strokeWidth="8" 
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
          />
          <path 
            d="M45 35 L65 35 L50 55 L70 55 L40 80 L45 50 L30 50 L45 35 Z" 
            fill="url(#logoGradient)" 
            filter="url(#glow)"
          />
        </svg>
      </div>
      <span className="text-3xl font-black text-white tracking-tight">
        {t.brandName}
      </span>
    </div>
  );
};