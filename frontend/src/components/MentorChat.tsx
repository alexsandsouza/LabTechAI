import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Bot, CornerDownLeft } from 'lucide-react';

// --- Sound Engine (Synthesized) ---
const playSound = (freq: number, type: OscillatorType = 'sine', duration = 0.1) => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

const TypewriterMessage = ({ content }: { content: string }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(content.slice(0, i));
      i++;
      if (i > content.length) {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [content]);

  return (
    <>
      {displayed.split('**').map((part, idx) => 
        idx % 2 === 1 ? <span key={idx} className="text-secondary dark:text-primary-foreground font-black">{part}</span> : part
      )}
    </>
  );
};

const AIMascot = ({ size = 200, className = "" }: { size?: number, className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full filter drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]"
    >
      <defs>
        <linearGradient id="robotWhite" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="visorBlack" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="neonPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <filter id="eyeGlowChat" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="100" r="90" fill="none" stroke="url(#neonPurple)" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.4" />
        <circle cx="100" cy="100" r="82" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.2" />
      </motion.g>

      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="35" y="75" width="20" height="40" rx="6" fill="#cbd5e1" />
        <rect x="145" y="75" width="20" height="40" rx="6" fill="#cbd5e1" />
        
        <path 
          d="M50,80 Q50,30 100,30 Q150,30 150,80 L150,110 Q150,140 100,140 Q50,140 50,110 Z" 
          fill="url(#robotWhite)" 
          stroke="#f1f5f9"
          strokeWidth="1"
        />

        <rect x="60" y="65" width="80" height="55" rx="18" fill="url(#visorBlack)" />
        <rect x="63" y="68" width="74" height="49" rx="16" fill="none" stroke="#ffffff10" strokeWidth="1" />

        <g>
          <ellipse cx="85" cy="88" rx="6" ry="10" fill="#22d3ee" filter="url(#eyeGlowChat)" />
          <ellipse cx="115" cy="88" rx="6" ry="10" fill="#22d3ee" filter="url(#eyeGlowChat)" />
          <path 
            d="M88,105 Q100,112 112,105" 
            stroke="#22d3ee" 
            strokeWidth="2.5" 
            fill="none" 
            strokeLinecap="round" 
            filter="url(#eyeGlowChat)"
          />
        </g>
      </motion.g>
    </motion.svg>
  </div>
);

const MESSAGES = [
  { role: 'bot', content: 'Saudações, futuro Desenvolvedor de Elite! Eu sou o **Mentor LabTech v2.5**. Em que posso acelerar sua carreira hoje?' },
];

const SUGGESTIONS = [
  "O que vou aprender nos 12 módulos?",
  "Como funciona o certificado?",
  "Tem suporte para iniciantes?",
  "Qual o valor do Elite Pro?"
];

const MentorChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const toggleChat = () => {
    if (!isOpen) playSound(800, 'sine', 0.2);
    else playSound(400, 'sine', 0.1);
    setIsOpen(!isOpen);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    playSound(600, 'triangle', 0.1);
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let response = "Excelente pergunta! Nosso ecossistema é focado em prática real. Posso te garantir que o aprendizado aqui é 10x mais rápido que em faculdades tradicionais. Pronto para subir de nível?";
      
      const lowerText = text.toLowerCase();

      if (lowerText.includes('módulo') || lowerText.includes('aprender') || lowerText.includes('curso')) {
         response = "Nossa trilha é composta por **12 Módulos de Elite**. Você vai masterizar do zero ao avançado: **React 19, Next.js 15, Node.js, TypeScript e Inteligência Artificial**. Cada módulo tem um projeto real para o seu portfólio!";
      } else if (lowerText.includes('certificado') || lowerText.includes('conclusão') || lowerText.includes('diploma')) {
         response = "Sim! Ao concluir a jornada, você desbloqueia o **Certificado LabTech Elite**. Ele não é apenas um papel, é a prova de que você domina as stacks que as BigTechs utilizam. Pronto para buscar o seu?";
      } else if (lowerText.includes('valor') || lowerText.includes('preço')) {
         response = "O investimento no plano **Elite Pro** é de apenas **R$ 49,90/mês**. É menos que um café por dia para ter acesso a toda a nossa infraestrutura e mentorias!";
      }

      setMessages(prev => [...prev, { role: 'bot', content: response }]);
      setIsTyping(false);
      playSound(1200, 'sine', 0.1);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-4 font-sans">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' }}
            className="w-[90vw] md:w-[420px] h-[650px] max-h-[85vh] bg-white dark:bg-[#080B14]/98 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-[0_40px_120px_rgba(34,211,238,0.2)] flex flex-col overflow-hidden relative"
          >
            {/* Elite Header */}
            <div className="p-8 pb-10 bg-gradient-to-br from-primary to-secondary text-white relative">
               <div className="absolute -top-10 -right-10 opacity-10">
                  <AIMascot size={200} />
               </div>
               <div className="flex items-center gap-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-xl ring-1 ring-white/30 overflow-hidden">
                     <AIMascot size={80} className="scale-150" />
                  </div>
                  <div>
                     <h3 className="font-black uppercase tracking-[-0.02em] text-xl leading-none mb-1">Mentor IA Lab</h3>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Operacional</span>
                     </div>
                  </div>
                  <button onClick={toggleChat} className="ml-auto w-10 h-10 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/40 transition-all border border-white/10">
                     <X size={20} />
                  </button>
               </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-grow p-8 pt-6 overflow-y-auto flex flex-col gap-8 custom-scrollbar">
               {messages.map((m, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className={`flex flex-col max-w-[90%] ${m.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                 >
                    <div className={`p-5 rounded-3xl text-sm font-bold leading-relaxed transition-all ${
                      m.role === 'bot' 
                      ? 'bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-sm' 
                      : 'bg-primary text-white rounded-br-none shadow-xl shadow-primary/20'
                    }`}>
                       {m.role === 'bot' && i === messages.length - 1 && i !== 0 
                         ? <TypewriterMessage content={m.content} /> 
                         : m.content.split('**').map((part, idx) => idx % 2 === 1 ? <span key={idx} className="text-secondary dark:text-cyan-400 font-extrabold">{part}</span> : part)
                       }
                    </div>
                 </motion.div>
               ))}
               {isTyping && (
                 <div className="flex gap-2 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl self-start">
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-primary rounded-full" />
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-primary rounded-full" />
                    <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-primary rounded-full" />
                 </div>
               )}
            </div>

            {/* Elite Input */}
            <div className="p-8 pt-0">
               {messages.length === 1 && (
                 <div className="flex flex-wrap gap-2 mb-6">
                    {SUGGESTIONS.map((s, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleSend(s)} 
                        className="px-4 py-2 bg-slate-50 dark:bg-white/5 hover:bg-primary hover:text-white transition-all text-[9px] font-black uppercase rounded-full border border-slate-200 dark:border-white/10"
                      >
                        {s}
                      </button>
                    ))}
                 </div>
               )}
               <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition duration-500" />
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                    placeholder="Envie um sinal para o Mentor..."
                    className="relative w-full pl-6 pr-16 py-5 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/10 rounded-2xl text-sm font-bold focus:outline-none transition-all dark:text-white shadow-inner"
                  />
                  <button 
                    onClick={() => handleSend(input)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30"
                  >
                     <CornerDownLeft size={20} />
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className={`w-20 h-20 rounded-[2.2rem] flex items-center justify-center shadow-2xl relative transition-all duration-500 overflow-hidden ${
           isOpen ? 'bg-rose-500 rotate-90' : 'bg-[#0F172A]'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
        {isOpen ? <X size={32} className="text-white" /> : <AIMascot size={100} className="scale-125" />}
        
        {!isOpen && (
          <div className="absolute inset-0 rounded-[2.2rem] border-2 border-primary/40 animate-ping opacity-30" />
        )}
      </motion.button>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default MentorChat;
