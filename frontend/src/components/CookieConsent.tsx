import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck, ArrowRight, X } from 'lucide-react';

interface CookieConsentProps {
  onOpenPrivacy: () => void;
}

const CookieConsent = ({ onOpenPrivacy }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('labtech_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500); // Aparece suavemente após 1.5s
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('labtech_cookie_consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
           initial={{ y: 100, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           exit={{ y: 100, opacity: 0 }}
           transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
           className="fixed bottom-6 left-6 right-6 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 z-[130] w-auto max-w-[95%] lg:max-w-4xl"
        >
           <div className="bg-white/80 dark:bg-[#0F172A]/90 backdrop-blur-3xl border border-slate-200/50 dark:border-white/10 rounded-[2.5rem] p-6 lg:p-8 shadow-[0_40px_100px_rgba(0,0,0,0.3)] flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden group">
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

              <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 shadow-inner">
                    <Cookie size={28} className="animate-pulse" />
                 </div>
                 <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                       <ShieldCheck size={14} className="text-emerald-500" />
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Conformidade LGPD Alpha</span>
                    </div>
                    <p className="text-sm lg:text-base font-bold text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
                       Utilizamos cookies essenciais para garantir que sua jornada no laboratório seja fluida e segura. Ao continuar, você aceita nossos <button onClick={onOpenPrivacy} className="text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all">Protocolos de Privacidade</button>.
                    </p>
                 </div>
              </div>

              <div className="flex items-center gap-4 w-full lg:w-auto shrink-0">
                 <button 
                   onClick={handleAccept}
                   className="flex-grow lg:flex-none px-10 py-5 bg-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group/btn"
                 >
                    Aceitar Protocolo <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                 </button>
                 <button 
                   onClick={() => setIsVisible(false)}
                   className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
                 >
                    <X size={20} />
                 </button>
              </div>
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
