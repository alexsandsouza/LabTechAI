import { motion } from 'framer-motion';
import { Cpu, TrendingUp, Zap, Shield, Microscope } from 'lucide-react';

const Pillars = [
  {
    id: '01',
    title: 'Lab Practice (Prática Extrema)',
    desc: 'Onde o código "sangra" em projetos reais. Você não assiste aulas, você lidera squads de desenvolvimento simulando players como Netflix e Stripe.',
    icon: <Microscope size={32} />,
    color: 'from-blue-500 to-cyan-400',
    details: ['Arquitetura de Sistemas Reais', 'Code-First Mentality', 'Squad Simulation']
  },
  {
    id: '02',
    title: 'AI Co-Pilot (Mentoria 24h)',
    desc: 'Esqueça fóruns lentos. Nossa IA exclusiva entende seu código linha por linha, corrigindo bugs e sugerindo melhorias em tempo real, 24/7.',
    icon: <Cpu size={32} />,
    color: 'from-primary to-secondary',
    details: ['IA Integrada no Dashboard', 'Live Support Semanal', 'Code Reviews Diários']
  },
  {
    id: '03',
    title: 'Career Pipeline (Elite Jobs)',
    desc: 'O método foca no que paga. Te preparamos para o mercado internacional, dominando soft skills, LinkedIn de alta performance e salários de Elite.',
    icon: <TrendingUp size={32} />,
    color: 'from-amber-400 to-orange-500',
    details: ['Mastery of Soft Skills', 'LinkedIn Elite Optimization', 'Freelance Global Strategy']
  }
];

const Methodology = () => {
  return (
    <section id="method" className="py-32 bg-[#F8FAFC] dark:bg-[#0F172A] relative overflow-hidden">
      {/* Decorative Matrix Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-10 mb-24">
           <div className="max-w-2xl">
              <div className="bg-primary/10 text-primary px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8 inline-block shadow-sm">Engenharia Pedagógica</div>
              <h2 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight">
                 O Método <span className="text-primary italic shrink-0">LabTech AI</span>
              </h2>
           </div>
           <p className="text-slate-500 dark:text-slate-400 font-bold max-w-sm text-lg leading-relaxed border-r-4 border-primary/20 pr-8 text-right italic font-serif">
              "Treinamento não é consumo, é execução. Forjamos o top 1% dos devs do mercado sul-americano."
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {Pillars.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative"
            >
              <div className="h-full p-10 lg:p-12 bg-white dark:bg-white/[0.03] rounded-[3.5rem] border border-slate-100 dark:border-white/5 hover:border-primary/30 transition-all hover:shadow-[0_40px_120px_-20px_rgba(139,92,246,0.15)] flex flex-col gap-8 backdrop-blur-3xl overflow-hidden">
                
                {/* Number Watermark */}
                <span className="absolute -top-6 -right-6 text-[10rem] font-black text-slate-100 dark:text-white/[0.02] group-hover:text-primary/[0.05] transition-colors leading-none select-none italic">
                   {pillar.id}
                </span>

                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white shadow-xl shadow-primary/10 relative z-10`}>
                   {pillar.icon}
                </div>

                <div className="relative z-10">
                   <h3 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-6 group-hover:text-primary transition-colors leading-none">
                      {pillar.title}
                   </h3>
                   <p className="text-slate-600 dark:text-slate-400 font-bold text-base leading-relaxed opacity-80 mb-8">
                      {pillar.desc}
                   </p>

                   <div className="flex flex-col gap-3">
                      {pillar.details.map((detail, idx) => (
                         <div key={idx} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-300">
                               {detail}
                            </span>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="mt-auto pt-10 relative z-10">
                   <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      Entrar no Fluxo <Zap size={14} className="fill-current" />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Success Indicator Section */}
        <div className="mt-32 p-10 lg:p-20 bg-[#0F172A] rounded-[4rem] text-white overflow-hidden relative group">
           <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
              <div className="flex flex-col gap-6 text-center lg:text-left">
                 <div className="flex items-center justify-center lg:justify-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                       <Shield size={24} className="text-blue-400" />
                    </div>
                    <span className="text-sm font-black uppercase tracking-[0.3em] text-blue-400">Certificação Elite Lab</span>
                 </div>
                 <h4 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-tight max-w-xl">
                    Sua jornada tem um <span className="text-primary italic shrink-0">Alvo Final</span>
                 </h4>
                 <p className="text-slate-400 font-bold text-lg max-w-lg">
                    Cada módulo entrega uma credencial verificável que prova para as empresas que você domina arquiteturas complexas na prática.
                 </p>
              </div>
              
              <div className="flex flex-col items-center gap-10">
                 <div className="relative">
                    <div className="absolute -inset-8 bg-primary blur-3xl opacity-20 animate-pulse" />
                    <div className="flex gap-4">
                       {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-16 lg:w-20 h-2 bg-white/5 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               whileInView={{ width: '100%' }}
                               transition={{ duration: 1.5, delay: i * 0.2 }}
                               className="h-full bg-primary"
                             />
                          </div>
                       ))}
                    </div>
                 </div>
                 <button className="px-12 py-6 bg-white text-slate-900 font-black text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10">
                    Aderir ao Plano LabTech
                 </button>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
