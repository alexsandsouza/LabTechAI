import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Star, Shield, ArrowRight } from 'lucide-react';

const PricingCard = ({ 
  title, 
  price, 
  period,
  features, 
  recommended = false, 
  onOpenAuth,
  delay = 0 
}: { 
  title: string, 
  price: string, 
  period: string,
  features: string[], 
  recommended?: boolean, 
  onOpenAuth: () => void,
  delay?: number 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={`relative group h-full ${recommended ? 'z-10' : 'z-0'}`}
    >
      {/* Animated Border for Recommended */}
      {recommended && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary rounded-[2.5rem] animate-pulse opacity-40 blur-md group-hover:opacity-100 transition-opacity" />
          {/* Glimmer Reflection Effect */}
          <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full animate-glimmer-card skew-x-[-20deg]" />
          </div>
        </>
      )}
      
      <div className={`relative h-full w-full rounded-[2.3rem] p-8 lg:p-10 flex flex-col gap-8 overflow-hidden backdrop-blur-3xl border border-white/10 ${
        recommended 
        ? 'bg-slate-900 text-white shadow-2xl shadow-primary/20' 
        : 'bg-white dark:bg-white/[0.02] text-slate-900 dark:text-white border-slate-100 dark:border-white/5'
      }`}>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${recommended ? 'text-primary' : 'text-slate-400'}`}>Plano</span>
            <h4 className="text-2xl font-black uppercase tracking-tighter italic">{title}</h4>
          </div>
          {recommended && (
            <div className="px-4 py-1.5 bg-primary/20 text-primary text-[10px] font-black uppercase rounded-full border border-primary/20">
               Recomendado
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black opacity-50 underline decoration-primary lg:text-4xl">R$</span>
          <span className="text-6xl lg:text-8xl font-black tracking-tighter">{price}</span>
          <span className="text-lg font-bold opacity-40">/{period}</span>
        </div>

        <div className="flex flex-col gap-4">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${recommended ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
                <Check size={12} strokeWidth={3} />
              </div>
              <span className="text-sm font-bold opacity-80">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <button 
            onClick={onOpenAuth}
            className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-xl ${
              recommended 
              ? 'bg-primary text-white shadow-primary/30' 
              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-black/10'
            }`}
          >
            Começar Agora
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Pricing = ({ onOpenAuth }: { onOpenAuth: () => void }) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-32 bg-[#F8FAFC] dark:bg-[#080E1C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
        
        <div className="flex flex-col items-center text-center gap-10 mb-24">
          <div className="flex flex-col items-center">
             <div className="bg-primary/10 text-primary px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8 inline-block shadow-sm">Investimento</div>
             <h2 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-6">
               Escolha seu nível de <span className="text-primary italic">Acesso</span>
             </h2>
             <p className="text-slate-500 dark:text-slate-400 font-bold max-w-xl text-lg italic">
                Preços flexíveis projetados para levar qualquer dev do zero à Elite internacional.
             </p>
          </div>

          {/* Toggle Innovation */}
          <div className="flex items-center gap-6 p-2 bg-slate-100 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5">
             <button 
               onClick={() => setIsYearly(false)}
               className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${!isYearly ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
             >
                Mensal
             </button>
             <button 
               onClick={() => setIsYearly(true)}
               className={`relative px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isYearly ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600'}`}
             >
                Anual
                <div className="absolute -top-6 -right-6 px-3 py-1 bg-emerald-500 text-white text-[8px] rounded-lg animate-bounce">
                   -20% OFF
                </div>
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mx-auto">
          <PricingCard 
            title="Elite Starter"
            price={isYearly ? "47" : "59"}
            period={isYearly ? "ano" : "mês"}
            features={['Todos os Módulos Fundamentais', 'Projetos de Portfólio Lvl 1', 'Comunidade Discord Starter', 'Suporte via Ticket']}
            onOpenAuth={onOpenAuth}
          />
          <PricingCard 
            title="Elite Pro"
            price={isYearly ? "77" : "97"}
            period={isYearly ? "ano" : "mês"}
            recommended={true}
            features={['Toda a Trilha Elite Lab', 'Mentoria 24h via Co-Piloto IA', 'Pipeline de Carreira Internacional', 'Certificação Verificável', 'Acesso VIP ao Hub de Eventos']}
            onOpenAuth={onOpenAuth}
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
