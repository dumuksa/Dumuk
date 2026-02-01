import React from 'react';
import { ArrowRight, Zap, ChevronDown } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang];
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-brand-dark">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-blue/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-green/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 opacity-60"></div>
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className={`absolute rounded-full mix-blend-screen animate-particle opacity-0`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100 + 50}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                backgroundColor: Math.random() > 0.5 ? '#05339C' : '#41A67E',
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            ></div>
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm animate-float">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-green"></span>
          </span>
          <span className="text-base font-medium text-gray-200">{t.hero.badge}</span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
          {t.hero.titleLine1} <br />
          <span className="text-gradient py-4 inline-block">
             {t.hero.titleLine2}
          </span> <br />
          {t.hero.titleLine3}
        </h1>

        <p className="mt-7 max-w-3xl mx-auto text-base md:text-lg text-gray-400 leading-relaxed font-light">
          {lang === 'ar' ? (
            <>في <span className="text-white font-bold">دوموك</span>، نضع معايير جديدة لنقل الطاقة والمواد الحساسة. <br className="hidden md:block" />خبرة، أمان، وسرعة تسبق الزمن.</>
          ) : (
            <>At <span className="text-white font-bold">Dumuk</span>, we set new standards for energy transport and sensitive materials. <br className="hidden md:block" />Experience, safety, and speed ahead of time.</>
          )}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button className="relative group w-full sm:w-auto min-w-[180px]">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-green rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
            <div className="relative px-8 py-4 bg-brand-dark rounded-full leading-none flex items-center justify-center gap-3 border border-white/10">
              <span className="text-white font-bold text-lg group-hover:text-brand-green transition-all">{t.hero.cta1}</span>
              <ArrowRight className={`w-5 h-5 text-brand-green group-hover:translate-x-1 transition-transform ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </div>
          </button>
          
          <button className="w-full sm:w-auto min-w-[180px] px-8 py-4 rounded-full font-bold text-lg bg-white/5 text-white hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
            <Zap className="w-5 h-5 text-brand-blue fill-current" />
            {t.hero.cta2}
          </button>
        </div>
      </div>

      <a href="#services" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500 hover:text-white transition-colors cursor-pointer">
        <ChevronDown size={32} />
      </a>
    </section>
  );
};