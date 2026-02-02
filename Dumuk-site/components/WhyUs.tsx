import React, { useEffect, useState, useRef } from 'react';
import { StatItem } from '../types';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';

interface WhyUsProps {
  lang: Language;
}

export const WhyUs: React.FC<WhyUsProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const stats: StatItem[] = [
    { label: t.whyUs.stat1, percentage: 100 },
    { label: t.whyUs.stat2, percentage: 100 },
    { label: t.whyUs.stat3, percentage: 98 },
  ];

  return (
    <section id="why-us" ref={sectionRef} className="py-32 bg-[#0f172a] relative overflow-hidden">
      <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
      <div className="absolute left-0 bottom-1/3 w-full h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-white text-xs font-bold mb-6 backdrop-blur-md">
              {t.whyUs.tag}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              {t.whyUs.title} <br/>
              <span className="block mt-2 py-3 text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-green">
                {t.whyUs.titleAccent}
              </span>
            </h2>
            
            <div className="space-y-4 text-gray-400 text-base leading-relaxed mb-8">
                <p>{t.whyUs.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-brand-card p-4 rounded-xl border border-white/5 hover:border-brand-green/30 transition-colors">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                       <Zap className="text-brand-green w-5 h-5"/> {t.whyUs.lithiumSector}
                    </h4>
                    <p className="text-sm text-gray-500">{t.whyUs.lithiumSectorDesc}</p>
                  </div>
                  <div className="bg-brand-card p-4 rounded-xl border border-white/5 hover:border-brand-blue/30 transition-colors">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                       <ShieldCheck className="text-brand-blue w-5 h-5"/> {t.whyUs.logisticsSector}
                    </h4>
                    <p className="text-sm text-gray-500">{t.whyUs.logisticsSectorDesc}</p>
                  </div>
                </div>
            </div>
            
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <div key={index} className="relative">
                  <div className={`flex justify-between items-end mb-2 ${lang === 'en' ? 'flex-row' : 'flex-row'}`}>
                    <span className="text-white font-bold text-base flex items-center gap-2">
                      <CheckCircle2 className="text-brand-green w-4 h-4" />
                      {stat.label}
                    </span>
                    <span className="text-brand-blue font-mono font-bold text-lg">{stat.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-brand-surface rounded-full overflow-hidden border border-white/5">
                    <div 
                      className={`h-full bg-gradient-to-r from-brand-green to-brand-blue rounded-full relative`}
                      style={{ 
                        width: isVisible ? `${stat.percentage}%` : '0%',
                        transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-full flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-sm aspect-[4/5] glass-panel rounded-3xl p-2 border border-white/10 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 overflow-hidden group">
               <div className="w-full h-full bg-brand-dark rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark/90 z-10"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-[60px] animate-pulse-slow"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/20 rounded-full blur-[60px] animate-pulse-slow delay-1000"></div>
                  
                  <div className={`absolute bottom-10 z-20 ${lang === 'ar' ? 'right-8' : 'left-8'}`}>
                     <div className="text-6xl font-black text-white/10 absolute -top-10 -right-4 select-none">DUMUK</div>
                     <h3 className="pb-4 text-3xl font-bold text-gold mb-2 relative">
                        {t.whyUs.strategicPartner}
                     </h3>
                     <p className="text-brand-green font-medium relative">{t.whyUs.newHorizons}</p>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};