import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Sparkles, X } from 'lucide-react';

const NotificationToast = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    const hideTimer = setTimeout(() => setIsVisible(false), 8000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ x: '120%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '120%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-10 right-10 z-[100] max-w-sm"
        >
          <div className="relative glass p-6 rounded-3xl shadow-3xl flex items-center gap-5 border border-white/20 overflow-hidden ring-4 ring-primary/5">
            {/* Background sparkle */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/20 blur-3xl rounded-full" />
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
               <X size={16} />
            </button>

            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-3 -left-3 bg-yellow-400 text-bg-dark p-1 rounded-full shadow-lg"
              >
                 <Trophy size={14} />
              </motion.div>
              <img src="https://i.pravatar.cc/100?u=alex" className="w-16 h-16 rounded-full border-4 border-primary/20 object-cover" alt="Student" />
            </div>

            <div className="flex flex-col gap-1 pr-6">
              <div className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                Alexsander S. 
                <span className="p-1 px-2 bg-green-500/10 text-green-500 text-[10px] font-black rounded-lg">LIVE</span>
              </div>
              <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                Subiu para Nível 12! 
                <Sparkles size={12} className="animate-pulse" />
              </div>
              <div className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1">
                 <Star size={8} fill="currentColor" />
                 Conquista Desbloqueada: CLOUD MASTER
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;
