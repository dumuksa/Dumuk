import React, { useEffect, useState } from 'react';
import { BatteryCharging, Hammer, RefreshCcw, ShieldCheck, Zap, ArrowRight, MapPin, Plus, Minus, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';
import product1Img from '../assets/images/lithium-lamps.png';
import product2Img from '../assets/images/lithium-batteries.png';
import product3Img from '../assets/images/battery-cells.png';
import product4Img from '../assets/images/battery-services.png';
import emailjs from '@emailjs/browser';


interface LithiumDetailsProps {
  onBack: () => void;
  lang: Language;
}

export const LithiumDetails: React.FC<LithiumDetailsProps> = ({ onBack, lang }) => {
  const t = translations[lang].lithiumDetails;
  const isRtl = lang === 'ar';

  const [partnerForm, setPartnerForm] = useState({
    formOrg: '',
    formCity: '',
    formPhone: '',
    formAddress: '',
  });
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [partnerLoading, setPartnerLoading] = useState(false);
  const [partnerPhoneError, setPartnerPhoneError] = useState<string | null>(null);

  const validatePartnerPhone = () => {
    const raw = partnerForm.formPhone || '';
    const digits = raw.replace(/\D/g, '');

    // Basic Saudi mobile pattern: 05XXXXXXXX (10 digits) or +9665XXXXXXXX (12 digits)
    const isLocal = digits.startsWith('05') && digits.length === 10;
    const isIntl = digits.startsWith('9665') && digits.length === 12;

    if (!digits || (!isLocal && !isIntl)) {
      setPartnerPhoneError(t.partnerPhoneError);
      return false;
    }

    setPartnerPhoneError(null);
    return true;
  };

  const handlePartnerSubmit = () => {
    if (!validatePartnerPhone()) return;

    setPartnerLoading(true);

    emailjs
      .send(
        'service_zg0afsu',
        'template_286ui1f',
        {
          formOrg: partnerForm.formOrg,
          formCity: partnerForm.formCity,
          formPhone: partnerForm.formPhone,
          formAddress: partnerForm.formAddress,
          time: new Date().toLocaleString(),
        },
        'TePMlWYolZ2pxDaj3'
      )
      .then(() => {
        setPartnerSubmitted(true);
        // Clear form after successful submit
        setPartnerForm({
          formOrg: '',
          formCity: '',
          formPhone: '',
          formAddress: '',
        });
        // Auto-hide success message after a few seconds
        setTimeout(() => {
          setPartnerSubmitted(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
      })
      .finally(() => {
        setPartnerLoading(false);
      });
  };
    

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const icons = [Hammer, RefreshCcw, ShieldCheck];
  const advantagesIcons = [Zap, BatteryCharging, ShieldCheck];
  const productsBgs = ['bg-emerald-900/30', 'bg-teal-900/30', 'bg-green-900/30', 'bg-cyan-900/30'];
  const productImages = [product1Img, product2Img, product3Img, product4Img];

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-12 animate-fade-in-up font-sans">
      {/* Header */}
      <div className="bg-brand-green/10 border-b border-brand-green/20 py-12 mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-green/20 blur-[100px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
          >
            <ArrowRight size={20} className={`${isRtl ? 'rotate-180' : 'rotate-0'} group-hover:translate-x-[-4px] transition-transform`} />
            <span>{t.back}</span>
          </button>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            {t.title} <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-green to-white">{t.accent}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
             {t.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Core Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.cards.map((item, idx) => (
              <div key={idx} className="bg-brand-card p-6 rounded-2xl border border-white/5 hover:border-brand-green/50 transition-all group">
                  <div className="w-14 h-14 bg-brand-green/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-green transition-colors">
                    {React.createElement(icons[idx], { className: "w-8 h-8 text-brand-green group-hover:text-white transition-colors" })}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
        </div>

        {/* Advantages & Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#0f172a] p-8 md:p-12 rounded-3xl border border-white/10">
            <div>
                <h3 className={`text-3xl font-bold text-white mb-8 pr-4 border-brand-green ${isRtl ? 'border-r-4' : 'border-l-4 pl-4'}`}>{t.advantagesTitle}</h3>
                <ul className="space-y-6">
                    {t.advantages.map((adv, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                          <div className="bg-brand-green/20 p-2 rounded-lg">
                            {React.createElement(advantagesIcons[idx], { className: "text-brand-green w-6 h-6" })}
                          </div>
                          <div>
                              <span className="text-white font-bold text-lg block mb-1">{adv.title}</span>
                              <span className="text-gray-400">{adv.desc}</span>
                          </div>
                      </li>
                    ))}
                </ul>
            </div>
            
            {/* Battery Animation */}
            <div className="flex justify-center items-center h-full min-h-[300px] relative">
               <div className="relative w-48 h-80 border-4 border-white/20 rounded-3xl p-2 flex flex-col justify-end backdrop-blur-sm bg-white/5">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-white/20 rounded-t-lg"></div>
                  <div className="w-full bg-gradient-to-t from-brand-green to-emerald-400 rounded-xl animate-pulse shadow-[0_0_30px_rgba(65,166,126,0.5)]" 
                       style={{ height: '85%', transition: 'height 2s' }}>
                       <div className="absolute w-full h-full overflow-hidden rounded-xl">
                          <div className="w-2 h-2 bg-white/40 rounded-full absolute bottom-0 left-1/4 animate-float"></div>
                          <div className="w-3 h-3 bg-white/30 rounded-full absolute bottom-0 left-1/2 animate-float delay-700"></div>
                          <div className="w-2 h-2 bg-white/40 rounded-full absolute bottom-0 left-3/4 animate-float delay-300"></div>
                       </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Zap className="w-16 h-16 text-white drop-shadow-lg animate-pulse" fill="currentColor"/>
                  </div>
               </div>
            </div>
        </div>

        {/* Products Scrollable Section */}
        <div>
          <div className={`flex justify-between items-end mb-6 px-2 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
            <h3 className="text-3xl font-bold text-white">{t.productsTitle}</h3>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
             {t.products.map((product, i) => (
                <div key={i} className={`flex-shrink-0 w-72 h-80 ${productsBgs[i % productsBgs.length]} rounded-3xl border border-white/10 relative group overflow-hidden snap-center cursor-pointer hover:border-brand-green/50 transition-all`}>
                   {/* Image background */}
                   <img 
                     src={productImages[i]} 
                     alt={product.name}
                     className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-transparent"></div>
                   <div className={`absolute bottom-0 left-0 w-full p-6 z-10 ${isRtl ? 'text-right' : 'text-left'}`}>
                      <h4 className="text-xl font-bold text-white group-hover:text-brand-green transition-colors">{product.name}</h4>
                      <p className="text-sm text-gray-400 mt-1">{lang === 'ar' ? 'جودة عالية وضمان شامل' : 'High quality & comprehensive warranty'}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* Centers Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <div className="bg-brand-card p-8 rounded-3xl border border-white/10">
              <h3 className={`text-2xl font-bold text-white mb-6 flex items-center gap-2 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                  <MapPin className="text-brand-green" /> {t.centersTitle}
              </h3>
              <div className="space-y-4 mb-8">
                  {t.centers.map((center, idx) => (
                      <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-green/30 transition-colors ${isRtl ? 'flex-row' : 'flex-row-reverse text-right'}`}>
                          <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green font-bold text-sm shrink-0">
                             {idx + 1}
                          </div>
                          <div>
                              <div className="text-white font-bold">{center.city}</div>
                              <div className="text-gray-400 text-sm">{center.address}</div>
                          </div>
                      </div>
                  ))}
              </div>
           </div>

           <div className="bg-gradient-to-br from-brand-green/10 to-brand-dark p-8 rounded-3xl border border-brand-green/20 relative overflow-hidden min-h-[360px]">
              <div className="relative z-10 h-full">
                  {/* Success overlay */}
                  <div
                    className={`absolute inset-0 px-8 pb-8 pt-12 flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out ${
                      partnerSubmitted
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-green to-emerald-600 rounded-full flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(65,166,126,0.4)]">
                      <CheckCircle2 size={40} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h4 className="text-2xl font-black text-white mb-3">
                      {t.partnerSuccessTitle}
                    </h4>
                    <p className="text-gray-200 text-sm leading-relaxed max-w-md">
                      {t.partnerSuccessMessage}
                    </p>
                    <div className="mt-6 w-24 h-1 bg-gradient-to-r from-brand-green to-brand-blue rounded-full" />
                  </div>

                  {/* Form block + heading */}
                  <div
                    className={`transition-all duration-500 ease-in-out h-full flex flex-col ${
                      partnerSubmitted
                        ? 'opacity-0 scale-95 pointer-events-none'
                        : 'opacity-100 scale-100 pointer-events-auto'
                    }`}
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{t.formTitle}</h3>
                      <p className="text-gray-400 mb-6 text-sm">{t.formSubtitle}</p>
                    </div>

                    <form className="space-y-4 mt-auto">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder={t.formCity}
                              value={partnerForm.formCity}
                              onChange={(e) => {
                                const onlyLetters = e.target.value.replace(/[0-9٠-٩]/g, '');
                                setPartnerForm({ ...partnerForm, formCity: onlyLetters });
                              }}
                              className="bg-brand-dark/50 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-green focus:outline-none"
                            />
                            <input
                              type="text"
                              placeholder={t.formOrg}
                              value={partnerForm.formOrg}
                              onChange={(e) => setPartnerForm({ ...partnerForm, formOrg: e.target.value })}
                              className="bg-brand-dark/50 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-green focus:outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                          <input
                            type="tel"
                            inputMode="numeric"
                            placeholder={t.formPhone}
                            value={partnerForm.formPhone}
                            onChange={(e) => {
                              const onlyDigits = e.target.value.replace(/\D/g, '');
                              setPartnerForm({ ...partnerForm, formPhone: onlyDigits });
                              if (partnerPhoneError) {
                                setPartnerPhoneError(null);
                              }
                            }}
                            className={`w-full bg-brand-dark/50 border rounded-lg p-3 text-white text-sm focus:outline-none ${
                              partnerPhoneError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand-green'
                            } ${isRtl ? 'text-right' : 'text-left'}`}
                            dir={isRtl ? 'rtl' : 'ltr'}
                          />
                          {partnerPhoneError && (
                            <p className="text-xs text-red-400 mt-1 text-start">
                              {partnerPhoneError}
                            </p>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder={t.formAddress}
                          value={partnerForm.formAddress}
                          onChange={(e) => setPartnerForm({ ...partnerForm, formAddress: e.target.value })}
                          className="w-full bg-brand-dark/50 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-green focus:outline-none"
                        />
                        
                        <button
                          type="button"
                          onClick={handlePartnerSubmit}
                          disabled={partnerLoading}
                          className="w-full bg-brand-green hover:bg-brand-green/90 disabled:hover:bg-brand-green disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg shadow-lg shadow-brand-green/20 transition-all flex items-center justify-center gap-2 mt-2"
                        >
                            <span>
                              {partnerLoading
                                ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...')
                                : t.formSubmit}
                            </span>
                            <ArrowUpRight size={18} />
                        </button>
                        <p className="text-xs text-gray-500 text-center mt-2">{t.formHint}</p>
                    </form>
                  </div>
              </div>
           </div>
        </div>

        {/* Interactive FAQ */}
        <div className="max-w-3xl mx-auto pt-8">
            <h3 className="text-3xl font-bold text-white text-center mb-10">{t.faqTitle}</h3>
            <div className="space-y-4">
            {t.faqs.map((faq, index) => (
                <div 
                key={index} 
                className={`bg-brand-card border border-white/5 rounded-xl overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'border-brand-green/50 shadow-lg shadow-brand-green/10' : ''}`}
                >
                <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className={`w-full px-6 py-5 flex items-center justify-between focus:outline-none ${isRtl ? 'text-right' : 'text-left'}`}
                >
                    <span className={`font-bold text-lg ${openFaqIndex === index ? 'text-brand-green' : 'text-white'}`}>
                    {faq.q}
                    </span>
                    <span className={`p-1 rounded-full ${openFaqIndex === index ? 'bg-brand-green text-black' : 'bg-white/10 text-gray-400'} ${isRtl ? 'mr-4' : 'ml-4'}`}>
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