import { useRef, useState, useEffect } from 'react';
import { Users, Award, Zap, Star } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const CountUp = ({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = to / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, to]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const StatCard = ({ icon: Icon, label, sublabel, color, countTarget, suffix, prefix }: { 
  icon: any, 
  label: string, 
  sublabel: string,
  color: string,
  countTarget: number,
  suffix?: string,
  prefix?: string
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative group p-14 lg:p-16 bg-white/5 dark:bg-white/[0.02] rounded-[4rem] border border-slate-100/50 dark:border-white/5 hover:border-primary/20 transition-all hover:scale-105 backdrop-blur-3xl overflow-hidden text-center h-full flex flex-col items-center justify-center shadow-sm hover:shadow-2xl hover:shadow-primary/5"
    >
       {/* Decorative radial light */}
       <div className={`absolute -right-10 -top-10 w-60 h-60 blur-[100px] rounded-full -z-10 group-hover:opacity-100 opacity-0 transition-opacity ${color}`} />
       
       <div className={`w-20 h-20 rounded-[1.5rem] mb-10 flex items-center justify-center transition-transform group-hover:scale-125 group-hover:rotate-12 bg-slate-50 dark:bg-slate-800 shadow-md border border-slate-100 dark:border-white/5 shadow-primary/5`}>
          <Icon size={42} className={color.replace('bg-', 'text-').replace('/20', '')} />
       </div>

       <div className="flex flex-col gap-4">
          <h4 className="text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
             <CountUp to={countTarget} suffix={suffix} prefix={prefix} />
          </h4>
          <div className="flex flex-col gap-2">
             <span className="text-sm font-black uppercase tracking-[0.5em] text-primary">{label}</span>
             <p className="text-slate-500 dark:text-slate-400 font-bold text-base leading-relaxed mt-4 max-w-xs">{sublabel}</p>
          </div>
       </div>

       <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
    </motion.div>
  );
};

const SocialProof = () => {
  return (
    <section id="social" className="py-32 bg-white dark:bg-[#080E1C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 lg:gap-14 items-stretch">
          <StatCard 
            icon={Users}
            countTarget={2400}
            prefix="+"
            label="Alunos Ativos"
            sublabel="Uma comunidade vibrante em expansão acelerada com desenvolvedores de elite."
            color="bg-primary/20"
          />
          <StatCard 
            icon={Award}
            countTarget={98}
            suffix="%"
            label="Satisfação"
            sublabel="Mentoria real constante para acelerar radicalmente sua transição profissional."
            color="bg-blue-500/20"
          />
          <StatCard 
            icon={Zap}
            countTarget={100}
            suffix="%"
            label="Metodologia"
            sublabel="Aulas práticas intensivas preparadas para os desafios reais do mercado global."
            color="bg-yellow-500/20"
          />
        </div>

        {/* Global Rating Indicator */}
        <div className="mt-28 flex flex-col items-center gap-10">
           <div className="flex items-center gap-3">
             {[1,2,3,4,5].map((i) => (
               <Star key={i} size={28} className="text-yellow-400 fill-yellow-400 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
             ))}
           </div>
           <p className="text-xs font-black uppercase tracking-[0.7em] text-slate-400 opacity-60">Global Elite Rating Excellence v2.5</p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
