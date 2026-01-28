import React, { useEffect, useState } from 'react';
import { Plane, Ship, Search, Package, CheckCircle2, ArrowRight, FileText, UserCheck, PlayCircle, Plus, Minus } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';

interface LogisticsDetailsProps {
  onBack: () => void;
  lang: Language;
}

export const LogisticsDetails: React.FC<LogisticsDetailsProps> = ({ onBack, lang }) => {
  const t = translations[lang].logisticsDetails;
  const isRtl = lang === 'ar';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const icons = [Package, Ship, Search, CheckCircle2];
  const journeyIcons = [UserCheck, FileText, Search, PlayCircle];

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-12 animate-fade-in-up font-sans">
      {/* Header */}
      <div className="bg-brand-blue/10 border-b border-brand-blue/20 py-12 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 blur-[100px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
          >
            <ArrowRight size={20} className={`${isRtl ? 'rotate-180' : 'rotate-0'} group-hover:translate-x-[-4px] transition-transform`} />
            <span>{t.back}</span>
          </button>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            {t.title} <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-blue to-white">{t.accent}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.services.map((service, idx) => (
            <div key={idx} className="bg-brand-card rounded-3xl p-8 border border-white/5 hover:border-brand-blue/50 transition-all group shadow-lg">
              <div className="w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(5,51,156,0.4)]">
                {React.createElement(icons[idx], { className: "w-8 h-8 text-white" })}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.desc}
              </p>
              
              {service.air && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
                    <Plane className="w-5 h-5 text-brand-green" />
                    <span>{service.air}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
                    <Ship className="w-5 h-5 text-brand-blue" />
                    <span>{service.sea}</span>
                  </div>
                </div>
              )}

              {service.items && (
                <ul className="space-y-2 text-gray-400">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-brand-blue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Visual Break with Motion Background */}
        <div className="relative h-64 md:h-80 rounded-[3rem] overflow-hidden my-12 group shadow-[0_20px_50px_rgba(5,51,156,0.3)]">
             {/* Base Image with Parallax-like Zoom */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494412574643-35d324698428?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-[15s] group-hover:scale-110"></div>
             
             {/* Layered Color Overlay */}
             <div className="absolute inset-0 bg-brand-blue/70 mix-blend-multiply transition-colors group-hover:bg-brand-blue/60 duration-500"></div>
             
             {/* Animated Scan Light Streak for Motion */}
             <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent w-[200%] h-[200%] animate-scan pointer-events-none"></div>

             {/* Floating Cargo/Energy Particles */}
             <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-green rounded-full blur-[1px] animate-blob"></div>
                <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-white/30 rounded-full blur-[2px] animate-blob [animation-delay:2s]"></div>
                <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-brand-blue rounded-full blur-[1px] animate-blob [animation-delay:4s]"></div>
             </div>

             {/* Content */}
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                 <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/20">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-2 drop-shadow-lg tracking-tight">
                        {t.breakTitle}
                    </h2>
                    <p className="text-white/90 text-lg max-w-2xl font-medium">
                        {t.breakSubtitle}
                    </p>
                 </div>
             </div>
        </div>

        {/* Requirements & Timeline */}
        <div className="space-y-12">
            <div className="text-center">
               <h2 className="text-3xl font-bold text-white mb-4">{t.journeyTitle}</h2>
               <p className="text-gray-400">{t.journeySubtitle}</p>
            </div>

            <div className="relative">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                    {t.journeySteps.map((step, i) => (
                        <div key={i} className="bg-brand-card p-6 rounded-2xl border border-white/5 text-center hover:-translate-y-2 transition-transform duration-300">
                             <div className="w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border-4 border-brand-dark shadow-lg">
                                {React.createElement(journeyIcons[i], { size: 20 })}
                             </div>
                             <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                             <p className="text-sm text-gray-400">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* How to Start CTA */}
            <div className="bg-gradient-to-r from-brand-blue to-indigo-900 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-brand-blue/20">
                 <h3 className="text-3xl font-bold text-white mb-6">{t.ctaTitle}</h3>
                 <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                    {t.ctaDesc}
                 </p>
                 <button 
                  onClick={() => {
                      const contactSection = document.getElementById('contact');
                      contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white text-brand-blue font-bold py-4 px-10 rounded-xl transition-all hover:scale-105 hover:bg-gray-100 shadow-xl"
                >
                    {t.ctaBtn}
                </button>
            </div>
        </div>

        {/* Logistics FAQ */}
        <div className="max-w-3xl mx-auto pt-8">
            <h3 className="text-3xl font-bold text-white text-center mb-10">{t.faqTitle}</h3>
            <div className="space-y-4">
            {t.faqs.map((faq, index) => (
                <div 
                key={index} 
                className={`bg-brand-card border border-white/5 rounded-xl overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'border-brand-blue/50 shadow-lg shadow-brand-blue/10' : ''}`}
                >
                <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className={`w-full px-6 py-5 flex items-center justify-between focus:outline-none ${isRtl ? 'text-right' : 'text-left'}`}
                >
                    <span className={`font-bold text-lg ${openFaqIndex === index ? 'text-brand-blue' : 'text-white'}`}>
                    {faq.q}
                    </span>
                    <span className={`p-1 rounded-full ${openFaqIndex === index ? 'bg-brand-blue text-white' : 'bg-white/10 text-gray-400'} ${isRtl ? 'mr-4' : 'ml-4'}`}>
                    {openFaqIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                </button>
                
                <div 
                    className={`px-6 text-gray-400 transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaqIndex === index ? 'max-h-60 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'
                    }`}
                >
                    <p className="leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                    </p>
                </div>
                </div>
            ))}
            </div>
        </div>

      </div>
    </div>
  );
};