import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, PlayCircle, MessageCircle, CheckCircle2, Users, ChevronDown, BookText, Code2, Bell, MessageSquareMore, GitCompare, Spline, Cog } from 'lucide-react';

const LessonPlayer = ({ onClose }: { onClose: () => void }) => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>('f2-7');

  const curriculum = [
    {
      groupTitle: 'Fase 1. Variáveis e operações básicas',
      isCompleted: true,
      items: [
        { id: 1, title: '1. Variáveis e operações básicas', count: '5 de 5 concluído' },
        { id: 2, title: '2. Operações básicas', count: '4 de 4 concluído' },
        { id: 3, title: '3. Funções', count: '9 de 9 concluído' },
        { id: 4, title: '4. Strings e dados booleanos', count: '18 de 18 concluído' },
      ]
    },
    {
      groupTitle: 'Fase 2. Comparações, condicionais e funções',
      isCompleted: true,
      items: [
        { id: 5, title: '5. Comparações', count: '5 de 5 concluído' },
        { id: 6, title: '6. Condicional if', count: '8 de 8 concluído' },
        { 
          id: 7, 
          title: '7. Corpo da função', 
          count: '9 de 9 concluído',
          themes: [
            { id: 1, title: 'Método .trim()', type: 'reading' },
            { id: 2, title: 'Formatação de e-mail', type: 'quiz' },
            { id: 3, title: 'Reatribuindo valor à variável', type: 'reading' },
            { id: 4, title: 'Transforme em maiúsculas', type: 'quiz' },
            { id: 5, title: 'Trabalhando com números', type: 'reading' },
            { id: 6, title: 'Metros para Quilômetros', type: 'quiz' },
            { id: 7, title: 'Projeto 4 - App Conversor', type: 'reading' },
            { id: 8, title: 'Km para Milhas', type: 'quiz' },
            { id: 9, title: 'Celsius para Fahrenheit', type: 'quiz' },
          ]
        },
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      className="fixed inset-0 z-[300] bg-white dark:bg-[#080B14] flex flex-col font-sans overflow-hidden"
    >
      <header className="h-20 border-b border-slate-100 dark:border-white/5 flex items-center justify-between px-8 bg-white/50 dark:bg-[#0B101E]/80 backdrop-blur-2xl z-20">
         <div className="flex items-center gap-6">
            <button onClick={onClose} className="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-500 hover:text-primary active:scale-95">
               <ChevronLeft size={24} />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10" />
            <div>
               <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-0.5">DEVstart // Academy</h2>
               <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">Módulo 1. Lógica de Programação</p>
            </div>
         </div>
         <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span className="hidden md:inline">61 de 61 lições concluídas</span>
            <div className="w-48 h-2 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
               <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
            </div>
         </div>
      </header>

      <main className="flex-grow flex overflow-hidden">
         <div className="flex-grow overflow-y-auto p-8 lg:p-16 custom-scrollbar bg-slate-50/10 dark:bg-transparent">
            <div className="max-w-4xl mx-auto">
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-white/[0.02] rounded-[3.5rem] p-10 lg:p-16 border border-slate-200 dark:border-white/5 shadow-2xl shadow-black/5 flex flex-col gap-10"
               >
                  <div className="flex items-center gap-4">
                     <span className="px-5 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-primary/20">Projeto 4: Global Converter</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none m-0">Funções: <span className="italic text-primary">Engenharia de Conversão</span></h1>
                  <p className="text-xl font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl italic">Aprendemos a moldar dados dentro do corpo das funções. Agora, transformamos qualquer unidade em informação global.</p>
                  <div className="h-[1px] w-full bg-slate-200 dark:bg-white/10" />
                  <div className="aspect-video bg-slate-950 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                     <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors cursor-pointer">
                        <PlayCircle size={80} className="text-white drop-shadow-2xl group-hover:scale-110 transition-transform" />
                     </div>
                  </div>
                  <div className="flex justify-between items-center bg-emerald-500/5 p-8 rounded-[2.5rem] border border-emerald-500/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white dark:bg-[#0B101E] rounded-2xl flex items-center justify-center text-emerald-500 shadow-xl border border-emerald-500/20">
                         <Cog size={24} />
                      </div>
                      <span className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">Engenharia de Dados Master! +800 XP</span>
                    </div>
                  </div>
               </motion.div>
            </div>
         </div>

         <aside className="hidden lg:flex w-[500px] border-l border-slate-100 dark:border-white/5 flex-col bg-white dark:bg-[#0B101E] relative z-10 overflow-hidden shadow-2xl transition-all">
            <div className="p-6 flex flex-col gap-3 shrink-0">
               <button className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/10 transition-all group">
                  <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform"><MessageCircle size={20} /></div>
                  <div className="text-left"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Nosso Grupo</p><p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">WhatsApp de Suporte</p></div>
               </button>
               <button className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/10 transition-all group">
                  <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform"><Users size={20} /></div>
                  <div className="text-left"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Central de Dúvidas</p><p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">Comunidade no Discord</p></div>
               </button>
            </div>

            <div className="flex-grow overflow-y-auto custom-scrollbar px-6 pb-6 flex flex-col gap-8">
               {curriculum.map((phase, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                     <div className="flex items-center gap-4 px-2">
                        <div className="flex-grow h-[1px] bg-slate-100 dark:bg-white/5" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 whitespace-nowrap">{phase.groupTitle}</span>
                        <div className="flex-grow h-[1px] bg-slate-100 dark:bg-white/5" />
                     </div>
                     <div className="flex flex-col gap-3">
                        {phase.items.map((item) => (
                           <div key={item.id} className="flex flex-col gap-2">
                              <button 
                                 onClick={() => setExpandedPhase(expandedPhase === `f${idx}-${item.id}` ? null : `f${idx}-${item.id}`)}
                                 className={`p-6 rounded-[2.5rem] flex flex-col gap-3 transition-all text-left ${
                                   expandedPhase === `f${idx}-${item.id}` ? 'bg-slate-900 text-white shadow-2xl' : 'bg-slate-50 dark:bg-white/5 text-slate-500 opacity-60'
                                 }`}
                              >
                                 <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                       <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.id === 7 ? 'bg-primary text-white animate-pulse' : 'bg-emerald-500/20 text-emerald-500'}`}>
                                          {item.id === 7 ? <Cog size={16} /> : <CheckCircle2 size={16} />}
                                       </div>
                                       <span className="text-xs font-black uppercase tracking-tighter">{item.title}</span>
                                    </div>
                                    <ChevronDown size={14} className={`transition-transform ${expandedPhase === `f${idx}-${item.id}` ? 'rotate-180' : ''}`} />
                                 </div>
                                 <span className="text-[9px] font-black uppercase tracking-widest opacity-60">{item.count}</span>
                              </button>
                              
                              <AnimatePresence>
                                 {expandedPhase === `f${idx}-${item.id}` && item.themes && (
                                   <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-col gap-1 pl-6 overflow-hidden">
                                      {item.themes.map((theme) => (
                                         <button key={theme.id} className="p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-5 group transition-all">
                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                            {theme.type === 'reading' ? <BookText size={18} className="text-slate-400 group-hover:text-primary" /> : <Code2 size={18} className="text-slate-400 group-hover:text-emerald-500" />}
                                            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tighter group-hover:text-primary transition-colors">{theme.title}</span>
                                         </button>
                                      ))}
                                   </motion.div>
                                 )}
                              </AnimatePresence>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}

               <div className="mt-4">
                  <div className="p-8 bg-primary/10 rounded-[3rem] border border-primary/20 relative overflow-hidden group/msg">
                     <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">🏆 Top Membro</p>
                     <p className="text-xs font-black text-slate-900 dark:text-white uppercase leading-relaxed tracking-tighter">O LAB LEVEL está de volta!</p>
                  </div>
               </div>
            </div>
         </aside>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.2); border-radius: 10px; }
      `}</style>
    </motion.div>
  );
};

export default LessonPlayer;
