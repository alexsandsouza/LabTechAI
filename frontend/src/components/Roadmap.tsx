import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, PlayCircle, Trophy, X, Zap, CheckCircle2, Cpu, Layout, ShieldCheck } from 'lucide-react';
import LessonPlayer from './LessonPlayer';

const MODULES_DATA = [
  { id: 1, title: 'Lógica de Programação', project: 'Engine de Algoritmos Puros', lessons: ['Boas-vindas ao DEVstart', 'Conceito de Variáveis', 'Atribuição de Dados', 'Estruturas em JS'], isFree: true, xp: 500, icon: <Cpu size={24} /> },
  { id: 2, title: 'HTML 5', project: 'Estruturação de Elite', lessons: ['Tags Semânticas', 'SEO Foundation', 'Acessibilidade Digital', 'Arquitetura de Documentos'], isFree: true, xp: 600, icon: <Layout size={24} /> },
  { id: 3, title: 'CSS 3', project: 'Design System Cinematográfico', lessons: ['Flexbox & Grid Pro', 'Animações com Keyframes', 'Variáveis & Temas', 'Responsividade Master'], isFree: true, xp: 800, icon: <Layout size={24} /> },
  { id: 4, title: 'JavaScript', project: 'Sistemas Interativos Reais', lessons: ['ES6+ Advanced Syntax', 'Asincronismo & Promises', 'Manipulação de DOM', 'Data Fetching & APIs'], isFree: true, xp: 1200, icon: <Zap size={24} /> },
  { id: 5, title: 'Engenharia de Prompts', project: 'Orquestração de LLMs', lessons: ['Persona Framework', 'Chain of Thought', 'Iteração de Contexto', 'Prompt Hacking Defensive'], isFree: false, xp: 2000, icon: <Cpu size={24} /> },
  { id: 6, title: 'Inteligência Artificial', project: 'SaaS c/ IA Integrada', lessons: ['Integração OpenAI/Claude', 'Vector Databases', 'AI Workflows', 'Model Fine-tuning Basics'], isFree: false, xp: 2500, icon: <Cpu size={24} /> },
  { id: 7, title: 'React', project: 'Interfaces de Alta Fidelidade', lessons: ['Hooks Master', 'Gerenciamento de Estado', 'Componentização Escalável', 'Performance Audit'], isFree: false, xp: 3000, icon: <Layout size={24} /> },
  { id: 8, title: 'TypeScript', project: 'Enterprise Grade Project', lessons: ['Generics & Advanced Types', 'Type-Safe Development', 'Interface Design', 'Zod & Validation'], isFree: false, xp: 4000, icon: <ShieldCheck size={24} /> },
];

const ModuleModal = ({ module, isOpen, onClose }: { module: any, isOpen: boolean, onClose: () => void }) => {
  if (!module) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-5 lg:p-10 pointer-events-none">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-955/80 backdrop-blur-xl pointer-events-auto" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-5xl bg-white dark:bg-[#080B14] rounded-[3.5rem] shadow-[0_50px_200px_rgba(34,211,238,0.2)] overflow-hidden pointer-events-auto flex flex-col lg:flex-row h-full max-h-[85vh] border border-white/5">
             <div className="w-full lg:w-[40%] bg-gradient-to-br from-primary via-secondary to-primary p-12 flex flex-col justify-between text-white relative">
                <div className="absolute top-10 right-10 opacity-20 transform scale-150">{module.icon}</div>
                <div>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] bg-white/10 px-4 py-2 rounded-full mb-8 inline-block backdrop-blur-3xl border border-white/20 shadow-xl">Módulo {module.id < 10 ? `0${module.id}` : module.id}</span>
                   <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-8 py-0.5">{module.title}</h2>
                   <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 text-white/80"><PlayCircle size={18} className="text-white" /><span className="text-[11px] font-black uppercase tracking-widest leading-none">Aulas Dinâmicas</span></div>
                      <div className="flex items-center gap-3 text-white/80"><Zap size={18} className="text-yellow-400" /><span className="text-[11px] font-black uppercase tracking-widest leading-none">+{module.xp} XP de Recompensa</span></div>
                   </div>
                </div>
                <div className="p-8 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 shadow-inner">
                   <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-400"><Trophy size={20} /></div><span className="text-[11px] font-black uppercase tracking-widest">Build v1.0:</span></div>
                   <p className="text-xl font-black italic text-white/90">{module.project}</p>
                </div>
             </div>
             <div className="flex-grow p-12 lg:p-16 overflow-y-auto custom-scrollbar flex flex-col gap-10 bg-white dark:bg-[#080B14]">
                <div className="flex justify-between items-center">
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Câmaras de <span className="text-primary italic">Conhecimento</span></h3>
                   <button onClick={onClose} className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:scale-110 active:scale-95 transition-all outline-none border border-black/5 dark:border-white/5"><X size={24} className="text-slate-500 dark:text-slate-400" /></button>
                </div>
                <div className="flex flex-col gap-5">
                   {module.lessons.map((lesson: string, i: number) => (
                     <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/[0.03] rounded-3xl group/lesson hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-all border border-transparent hover:border-primary/20 cursor-default">
                        <div className="flex items-center gap-6"><div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-sm font-black shadow-lg ring-1 ring-black/5 dark:ring-white/5 group-hover/lesson:scale-110 transition-transform">{i + 1}</div><span className="font-black text-slate-800 dark:text-slate-200 tracking-tight">{lesson}</span></div>
                        {(!module.isFree && i > 1) ? (<Lock size={20} className="text-slate-400 opacity-40" />) : (<div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500"><CheckCircle2 size={18} /></div>)}
                     </motion.div>
                   ))}
                </div>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Roadmap = () => {
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  return (
    <section id="modules" className="py-40 bg-white dark:bg-[#050810] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 blur-[180px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
        <div className="mb-32 text-center flex flex-col items-center">
           <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-primary/10 text-primary px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-10 inline-block shadow-xl border border-primary/20">Progressão Gamificada // Protocolo Elite</motion.div>
           <h2 className="text-6xl lg:text-[6.5rem] font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.85] mb-12">ECOSSISTEMA <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent italic animate-gradient-x px-4 pb-2">LABTECH</span></h2>
           <p className="text-slate-500 dark:text-slate-400 font-bold max-w-3xl text-xl lg:text-2xl leading-relaxed italic border-x-4 border-primary/20 px-12 py-2">Sua jornada foi desenhada por mentores de <span className="text-white font-black underline decoration-primary underline-offset-4">Elite</span>. Domine as stacks que constroem o futuro.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-40">
          {MODULES_DATA.map((module) => (
            <motion.div key={module.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: module.id * 0.05 }} onClick={() => setSelectedModule(module)} className="group relative cursor-pointer h-full">
               <div className="p-10 bg-white dark:bg-white/[0.02] rounded-[3.5rem] border border-slate-100 dark:border-white/5 hover:border-primary/40 transition-all hover:scale-[1.04] shadow-sm hover:shadow-[0_40px_100px_rgba(34,211,238,0.1)] dark:hover:shadow-[0_45px_120px_rgba(0,0,0,0.6)] h-full flex flex-col backdrop-blur-3xl relative overflow-hidden group/card">
                  <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-primary/20 to-transparent -translate-y-full group-hover/card:animate-scan z-0 pointer-events-none" />
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="flex justify-between items-start mb-12 relative z-10">
                     <span className="text-7xl font-black text-slate-100 dark:text-white/[0.03] select-none group-hover:text-primary/10 transition-colors tracking-tighter leading-none">{module.id < 10 ? `0${module.id}` : module.id}</span>
                     <div className="flex flex-col items-end gap-3">
                        {module.isFree ? (<motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="px-5 py-2 bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase rounded-2xl border border-emerald-500/20 shadow-inner backdrop-blur-md">Unlock Imediato</motion.div>) : (<div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all shadow-inner"><Lock size={20} className="text-slate-300 dark:text-white/10 group-hover:text-primary transition-colors" /></div>)}
                        <div className="text-[10px] font-black text-primary/40 group-hover:text-primary transition-colors uppercase tracking-[0.2em]">+{module.xp} XP</div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 mb-6 relative z-10"><div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-all border border-transparent group-hover:border-primary/20">{module.icon}</div><h4 className="flex-grow text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter group-hover:text-primary transition-colors leading-[1.1]">{module.title}</h4></div>
                  <div className="flex-grow relative z-10 flex flex-col gap-3"><span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-50 px-0.5">Build do Ciclo:</span><p className="text-lg font-bold text-slate-500 dark:text-slate-400 leading-tight italic">{module.project}</p></div>
                  <div onClick={(e) => { e.stopPropagation(); if (module.id === 1) setIsPlayerOpen(true); }} className="mt-14 flex items-center gap-4 text-primary font-black text-xs uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 translate-x-[-15px] group-hover:translate-x-0 transition-all duration-500 relative z-10">
                     <div className="w-8 h-0.5 bg-primary rounded-full" /> Iniciar Protocolo
                  </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ModuleModal module={selectedModule} isOpen={!!selectedModule} onClose={() => setSelectedModule(null)} />
      <AnimatePresence>
        {isPlayerOpen && <LessonPlayer onClose={() => setIsPlayerOpen(false)} />}
      </AnimatePresence>
      <style>{`
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(400%); } }
        .animate-scan { animation: scan 2s cubic-bezier(0.1, 0.4, 0.4, 1) infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.2); border-radius: 20px; }
      `}</style>
    </section>
  );
};

export default Roadmap;
