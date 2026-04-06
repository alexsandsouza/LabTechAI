import { motion } from 'framer-motion';
import { ArrowDown, Code2, Globe2, Rocket } from 'lucide-react';

const StepCard = ({ number, title, desc, icon: Icon, delay }: { number: string, title: string, desc: string, icon: any, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="relative group p-12 bg-white/5 dark:bg-white/[0.02] rounded-[3rem] border border-slate-100/50 dark:border-white/5 hover:border-primary/40 transition-all backdrop-blur-3xl h-full flex flex-col overflow-visible"
  >
     {/* Watermark Number - Moved higher and larger but with overflow visible */}
     <div className="absolute -right-6 -top-12 text-8xl lg:text-9xl font-black text-primary/10 select-none group-hover:text-primary/20 transition-all duration-700 pointer-events-none z-0">
        {number}
     </div>

     <div className="relative z-10 w-20 h-20 rounded-[1.5rem] bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-inner shadow-primary/5">
        <Icon size={42} className="text-primary shadow-[0_0_15px_#8B5CF6]" />
     </div>
     
     <h4 className="relative z-10 text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-5 pr-12">{title}</h4>
     <p className="relative z-10 text-slate-500 dark:text-slate-400 font-bold text-base leading-relaxed flex-grow">{desc}</p>
     
     <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-full" />
  </motion.div>
);

const ProcessSection = () => {
  return (
    <section id="process" className="py-32 bg-white dark:bg-[#080E1C] relative overflow-hidden">
      {/* Dynamic Background Circles */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[180px] rounded-full -translate-y-1/2 -z-10 animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[180px] rounded-full -translate-y-1/2 -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-32 gap-14 text-center md:text-left">
           <div className="flex flex-col gap-8">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                 <div className="w-12 h-2.5 bg-primary rounded-full shadow-[0_0_15px_#8B5CF6]" />
                 <span className="text-primary text-[13px] font-black uppercase tracking-[0.6em]">Operational Flow</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter max-w-2xl leading-[1.3] py-8 scale-y-[1.05]">
                 O Caminho da <br className="hidden md:block" /> <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic px-3 inline-block">Elite Tech</span>
              </h2>
           </div>
           <p className="text-slate-600 dark:text-slate-400 font-bold max-w-sm text-lg border-l-4 border-primary/20 pl-10 py-6 italic leading-relaxed hidden lg:block">
              Do zero absoluto ao domínio da stack mais desejada do mercado global.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 lg:gap-16">
           <StepCard 
             number="01"
             icon={Rocket}
             title="Imersão Imediata"
             desc="Entrada instantânea no ecossistema LAB. Sem burocracia, você já inicia nos laboratórios master produzindo código real."
             delay={0.1}
           />
           <StepCard 
             number="02"
             icon={Code2}
             title="Desenvolvimento Real"
             desc="Desafios práticos de alto nível. Você constrói ecossistemas completos usando a stack mais moderna e lucrativa do planeta."
             delay={0.2}
           />
           <StepCard 
             number="03"
             icon={Globe2}
             title="Posicionamento Pro"
             desc="Com mentoria estratégica e feedback real, você lapida seu perfil técnico para ser o alvo das maiores Big Techs do mundo."
             delay={0.3}
           />
        </div>

        {/* Scroll down indicator for Pricing */}
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="mt-28 flex flex-col items-center gap-6 text-slate-400 dark:text-slate-600 opacity-60"
        >
           <span className="text-[11px] font-black uppercase tracking-[0.7em]">Explore Investment</span>
           <div className="p-4 rounded-full border-2 border-slate-200 dark:border-slate-800 shadow-xl bg-white/5 backdrop-blur-md group-hover:border-primary transition-colors">
              <ArrowDown size={28} className="text-primary" />
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
