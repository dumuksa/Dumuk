import React from 'react';
import { Truck, BatteryCharging, ArrowUpRight } from 'lucide-react';
import { ViewState, Language } from '../App';
import { translations } from '../translations';
import { LucideIcon } from 'lucide-react';

interface ServicesProps {
    setView: (view: ViewState) => void;
    lang: Language;
}

interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  action: ViewState;
}

export const Services: React.FC<ServicesProps> = ({ setView, lang }) => {
  const t = translations[lang];
  const services: ServiceItem[] = [
    {
      title: t.services.lithiumTitle,
      description: t.services.lithiumDesc,
      icon: BatteryCharging,
      gradient: 'from-brand-green to-emerald-600',
      action: 'lithium'
    },
    {
      title: t.services.logisticsTitle,
      description: t.services.logisticsDesc,
      icon: Truck,
      gradient: 'from-brand-blue to-indigo-600',
      action: 'logistics'
    }
  ];

  return (
    <section id="services" className="py-32 bg-brand-dark relative overflow-hidden">
      <div className="absolute right-0 top-20 w-1/2 h-1/2 bg-brand-blue/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute left-0 bottom-20 w-1/2 h-1/2 bg-brand-green/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-green font-bold tracking-wider uppercase text-sm">{t.services.tag}</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-2 mb-4">
            {t.services.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-blue to-white">
              {t.services.titleAccent}
            </span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-brand-blue to-brand-green mx-auto rounded-full shadow-[0_0_15px_rgba(5,51,156,0.5)]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <div 
              key={index}
              onClick={() => setView(service.action)}
              className="group relative bg-brand-card rounded-[2.5rem] p-10 hover:-translate-y-2 transition-all duration-500 border border-white/5 hover:border-white/10 overflow-hidden cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${service.gradient} opacity-10 blur-[60px] rounded-full group-hover:opacity-20 transition-all duration-500`}></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg shadow-brand-dark/50 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-green transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 text-base leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 text-brand-green font-bold text-sm mt-auto">
                   <span className="border-b border-transparent group-hover:border-brand-green transition-all">{t.services.readMore}</span>
                   <ArrowUpRight className={`w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${lang === 'ar' ? '-scale-x-100' : ''}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};