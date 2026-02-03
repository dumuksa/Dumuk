import React, { useState, useRef } from 'react';
import { Mail, Phone, Send, MessageSquare, Copy, Check, CheckCircle2 } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';
import emailjs from '@emailjs/browser';

interface ContactProps {
  lang: Language;
}

export const Contact: React.FC<ContactProps> = ({ lang }) => {
  const t = translations[lang];
  const [copyStatus, setCopyStatus] = useState<'phone' | 'email' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const SERVICE_ID = 'service_zg0afsu';
  const TEMPLATE_ID = 'template_8ytxqxr';
  const PUBLIC_KEY = 'TePMlWYolZ2pxDaj3';

  const handleCopy = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    // prevent double‑submits
    if (isSending) return;
    setIsSending(true);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setIsSubmitted(true);
        formRef.current?.reset();
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
        alert(lang === 'ar' ? 'فشل الإرسال ❌' : 'Failed to send ❌');
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section id="contact" className="py-32 relative bg-brand-dark">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-[500px] bg-gradient-to-t from-brand-blue/10 to-transparent blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 w-fit mb-6">
              <MessageSquare size={18} />
              <span className="font-bold text-sm uppercase">{t.contact.tag}</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              {t.contact.title} <br/>
              <span className="block mt-3 py-4 text-transparent bg-clip-text bg-gradient-to-l from-brand-blue to-brand-green">
                {t.contact.titleAccent}
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              {t.contact.desc}
            </p>

            <div className="space-y-6 mt-10">
              <div
                onClick={() => handleCopy('+966558549944', 'phone')}
                className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-brand-green/30 transition-all group cursor-pointer relative"
              >
                <div className="w-12 h-12 bg-brand-green/20 rounded-full flex items-center justify-center flex-shrink-0 text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all">
                  <Phone size={26} />
                </div>
                <div className="flex-grow">
                  <h4 className="text-white font-bold text-sm mb-1">{t.contact.phoneLabel}</h4>
                  <p className="text-gray-400 text-base font-mono group-hover:text-white transition-colors">
                    <bdi>+966-55-854-9944</bdi>
                  </p>
                </div>
                <div
                  className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} text-brand-green/50 opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                  {copyStatus === 'phone' ? <Check size={20} className="text-brand-green" /> : <Copy size={20} />}
                </div>
              </div>

              <div
                onClick={() => handleCopy('dumuksa@gmail.com', 'email')}
                className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-brand-blue/30 transition-all group cursor-pointer relative"
              >
                <div className="w-12 h-12 bg-brand-blue/20 rounded-full flex items-center justify-center flex-shrink-0 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                  <Mail size={26} />
                </div>
                <div className="flex-grow">
                  <h4 className="text-white font-bold text-sm mb-1">{t.contact.emailLabel}</h4>
                  <p className="text-gray-400 text-base group-hover:text-white transition-colors">
                    dumuksa@gmail.com
                  </p>
                </div>
                <div
                  className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} text-brand-blue/50 opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                  {copyStatus === 'email' ? <Check size={20} className="text-brand-blue" /> : <Copy size={20} />}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-card p-10 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[500px]">
            <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-brand-blue to-brand-green"></div>

            {/* Success Message */}
            <div 
              className={`absolute inset-0 p-10 flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out ${
                isSubmitted 
                  ? 'opacity-100 scale-100 pointer-events-auto' 
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-brand-green to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(65,166,126,0.4)] animate-pulse">
                <CheckCircle2 size={48} className="text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                {t.contact.successTitle}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                {t.contact.successMessage}
              </p>
              <div className="mt-8 w-32 h-1 bg-gradient-to-r from-brand-blue to-brand-green rounded-full"></div>
            </div>

            {/* Form */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                isSubmitted 
                  ? 'opacity-0 scale-95 pointer-events-none' 
                  : 'opacity-100 scale-100 pointer-events-auto'
              }`}
            >
              <h3 className="text-3xl font-bold text-white mb-8">{t.contact.formTitle}</h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input name="from_name" type="text" placeholder={t.contact.namePlaceholder} className="w-full bg-brand-dark border-2 border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-green focus:outline-none transition-colors" required />
                  <input name="from_email" type="email" placeholder={t.contact.emailPlaceholder} className="w-full bg-brand-dark border-2 border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-green focus:outline-none transition-colors" required />
                </div>

                <input name="subject" type="text" placeholder={t.contact.subjectPlaceholder} className="w-full bg-brand-dark border-2 border-white/10 rounded-xl px-5 py-4 text-white focus:border-brand-green focus:outline-none transition-colors" required />

                <textarea name="message" rows={5} placeholder={t.contact.messagePlaceholder} className="w-full bg-brand-dark border-2 border-white/10 rounded-xl px-5 py-4 text-white resize-none focus:border-brand-green focus:outline-none transition-colors" required />

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-brand-blue to-brand-green text-white font-bold text-lg py-5 rounded-xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(65,166,126,0.4)] hover:scale-[1.02] transition-all disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isSending
                    ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...')
                    : t.contact.submit}
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
