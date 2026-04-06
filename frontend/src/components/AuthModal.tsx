import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, X, Globe, Code2, ArrowRight, UserPlus, LogIn, ShieldCheck, KeyRound, ArrowLeft } from 'lucide-react';

type AuthView = 'login' | 'signup' | 'forgot';

const AuthModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [view, setView] = useState<AuthView>('login');

  const titleMap = {
    login: { main: 'Login', sub: 'Bem-vindo de volta ao Laboratório' },
    signup: { main: 'Cadastro', sub: 'Crie sua identidade de Elite' },
    forgot: { main: 'Recuperar', sub: 'Redefina sua chave de segurança' }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-hidden">
          {/* Backdrop Blur with deeper tint */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-md bg-white dark:bg-[#0F172A] rounded-[3rem] shadow-[0_0_100px_rgba(139,92,246,0.3)] overflow-hidden border border-white/10"
          >
             {/* Dynamic Top Glow */}
             <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

             <div className="p-10 lg:p-12">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-10">
                   <div className="flex flex-col gap-1">
                      <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                         {titleMap[view].main} <span className="text-primary italic">Elite</span>
                      </h2>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                         {titleMap[view].sub}
                      </p>
                   </div>
                   <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:rotate-90 transition-transform">
                      <X size={20} className="text-slate-500" />
                   </button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={view}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col"
                  >
                    {/* Form Inputs */}
                    <div className="flex flex-col gap-5 mb-8">
                       {view === 'signup' && (
                         <div className="relative group">
                           <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"><UserPlus size={18} /></div>
                           <input 
                             type="text" 
                             placeholder="Nome de Elite" 
                             className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-sm font-bold focus:outline-none focus:border-primary/50 transition-all dark:text-white"
                           />
                         </div>
                       )}
                       <div className="relative group">
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"><Mail size={18} /></div>
                          <input 
                            type="email" 
                            placeholder="E-mail Funcional" 
                            className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-sm font-bold focus:outline-none focus:border-primary/50 transition-all dark:text-white"
                          />
                       </div>
                       
                       {view !== 'forgot' && (
                         <div className="flex flex-col gap-3">
                           <div className="relative group">
                              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"><Lock size={18} /></div>
                              <input 
                                type="password" 
                                placeholder="Chave de Segurança" 
                                className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-sm font-bold focus:outline-none focus:border-primary/50 transition-all dark:text-white"
                              />
                           </div>
                           {view === 'login' && (
                             <div className="flex justify-end pr-2">
                               <button 
                                 onClick={() => setView('forgot')}
                                 className="text-[10px] font-black uppercase text-slate-400 hover:text-primary transition-colors tracking-widest"
                               >
                                 Esqueceu sua chave?
                               </button>
                             </div>
                           )}
                         </div>
                       )}
                    </div>

                    {/* Primary Action Button */}
                    <button className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group/btn">
                       {view === 'login' ? 'Entrar Agora' : view === 'signup' ? 'Finalizar Cadastro' : 'Enviar Protocolo'}
                       {view === 'login' ? <LogIn size={20} className="group-hover/btn:translate-x-1.5 transition-transform" /> : <ArrowRight size={20} className="group-hover/btn:translate-x-1.5 transition-transform" />}
                    </button>
                  </motion.div>
                </AnimatePresence>

                {/* Footer Actions */}
                {view !== 'forgot' ? (
                  <>
                    <div className="my-10 flex items-center gap-4 text-center">
                       <div className="flex-grow h-px bg-slate-100 dark:bg-white/5" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ou acesse via</span>
                       <div className="flex-grow h-px bg-slate-100 dark:bg-white/5" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <button className="py-4 border border-slate-100 dark:border-white/10 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group/social">
                          <Globe size={18} className="text-rose-500 group-hover/social:scale-125 transition-transform" />
                          <span className="text-xs font-black text-slate-600 dark:text-slate-300">Google</span>
                       </button>
                       <button className="py-4 border border-slate-100 dark:border-white/10 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group/social">
                          <Code2 size={18} className="text-slate-900 dark:text-white group-hover/social:scale-125 transition-transform" />
                          <span className="text-xs font-black text-slate-600 dark:text-slate-300">GitHub</span>
                       </button>
                    </div>

                    <div className="mt-10 text-center">
                       <button 
                         onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                         className="text-[11px] font-black uppercase text-slate-500 hover:text-primary transition-colors tracking-widest leading-none"
                       >
                         {view === 'login' ? 'Não tem acesso? Crie seu perfil agora' : 'Já é Elite? Entre por aqui'}
                       </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-8 text-center">
                    <button 
                      onClick={() => setView('login')}
                      className="text-[11px] font-black uppercase text-slate-500 hover:text-primary transition-all flex items-center justify-center gap-3 w-full tracking-widest"
                    >
                      <ArrowLeft size={14} /> Voltar ao Login
                    </button>
                  </div>
                )}

                {/* Trust Indicator */}
                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                   <ShieldCheck size={14} className="text-emerald-500" /> Ambiente Criptografado Ponta-a-Ponta
                </div>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
