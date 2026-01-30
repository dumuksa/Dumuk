import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';

interface FAQProps {
  lang: Language;
}

export const FAQ: React.FC<FAQProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = translations[lang];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-brand-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">{t.faq.title}</h2>
          <p className="text-gray-400 text-sm md:text-base">{t.faq.subtitle}</p>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-brand-card border border-white/5 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-brand-green/50 shadow-lg shadow-brand-green/10' : ''}`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full px-6 py-5 flex items-center justify-between focus:outline-none ${lang === 'ar' ? 'text-right' : 'text-left'}`}
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-brand-green' : 'text-white'}`}>
                  {faq.question}
                </span>
                <span className={`p-1 rounded-full ${openIndex === index ? 'bg-brand-green text-black' : 'bg-white/10 text-gray-400'} ${lang === 'ar' ? 'mr-4' : 'ml-4'}`}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <div 
                className={`px-6 text-gray-400 transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-60 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'
                }`}
              >
                <p className="leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};