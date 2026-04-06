import { useState, useEffect } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Play, CheckCircle2, Loader2, Code2, Zap } from 'lucide-react';

const TypewriterText = ({ text, delay = 0, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timeoutId: any;
    const startTimeout = setTimeout(() => {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayText(text.slice(0, i));
        i++;
        if (i > text.length) {
          clearInterval(intervalId);
          setIsDone(true);
          if (onComplete) onComplete();
        }
      }, 50); // Velocidade da digitação
      return () => clearInterval(intervalId);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, delay, onComplete]);

  return (
    <span className="relative">
      {displayText}
      {!isDone && (
        <motion.span 
          animate={{ opacity: [1, 0] }} 
          transition={{ duration: 0.5, repeat: Infinity }} 
          className="inline-block w-2.5 h-4 bg-primary ml-1 translate-y-0.5"
        />
      )}
    </span>
  );
};

const AIMascot = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.svg
      viewBox="0 0 200 200"
      className="w-full h-full filter drop-shadow-[0_0_50px_rgba(34,211,238,0.4)]"
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
        <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Neon Rings */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="100" r="90" fill="none" stroke="url(#neonPurple)" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.4" />
        <circle cx="100" cy="100" r="82" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.2" />
      </motion.g>

      {/* Robot Head Body */}
      <motion.g
        animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Side Ear Units */}
        <rect x="35" y="75" width="20" height="40" rx="6" fill="#cbd5e1" />
        <rect x="145" y="75" width="20" height="40" rx="6" fill="#cbd5e1" />
        <circle cx="45" cy="95" r="8" fill="#22d3ee" opacity="0.3" filter="url(#eyeGlow)" />
        <circle cx="155" cy="95" r="8" fill="#22d3ee" opacity="0.3" filter="url(#eyeGlow)" />
        
        {/* Main Head Shell */}
        <path 
          d="M50,80 Q50,30 100,30 Q150,30 150,80 L150,110 Q150,140 100,140 Q50,140 50,110 Z" 
          fill="url(#robotWhite)" 
          stroke="#f1f5f9"
          strokeWidth="1"
        />

        {/* Visor Area */}
        <rect x="60" y="65" width="80" height="55" rx="18" fill="url(#visorBlack)" />
        <rect x="63" y="68" width="74" height="49" rx="16" fill="none" stroke="#ffffff10" strokeWidth="1" />

        {/* Facial Features (The "Drawing" request) */}
        <g>
          {/* Eyes (Vertical Ovals Cyan) */}
          <ellipse cx="85" cy="88" rx="6" ry="10" fill="#22d3ee" filter="url(#eyeGlow)" />
          <ellipse cx="115" cy="88" rx="6" ry="10" fill="#22d3ee" filter="url(#eyeGlow)" />
          
          {/* Smile (Cyan curve) */}
          <path 
            d="M88,105 Q100,112 112,105" 
            stroke="#22d3ee" 
            strokeWidth="2.5" 
            fill="none" 
            strokeLinecap="round" 
            filter="url(#eyeGlow)"
          />
        </g>

        {/* Dynamic HUD Lines on Vizor */}
        <motion.rect 
          x="65" y="70" width="70" height="1" 
          fill="#22d3ee" 
          opacity="0.1"
          animate={{ y: [0, 45, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.g>

      {/* Floating Data Bits */}
      <motion.g
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <circle cx="40" cy="50" r="3" fill="#a855f7" filter="url(#eyeGlow)" opacity="0.6" />
        <circle cx="160" cy="140" r="3" fill="#22d3ee" filter="url(#eyeGlow)" opacity="0.6" />
      </motion.g>
    </motion.svg>
  </div>
);

const Terminal = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  const resetTerminal = () => {
    setIsRunning(false);
    setProgress(0);
    setLogs([]);
    setActiveLine(0);
    setCycleKey(prev => prev + 1); // Força o re-mount dos Typewriters
  };

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(0);
    setLogs(['> INITIALIZING ELITE_PROTOCOL...', '> BUILDING CLOUD INFRASTRUCTURE...', '> OPTIMIZING AI PIPELINE...']);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      
      if (currentProgress === 40) setLogs(prev => [...prev, '> DEPLOYING NEXT.js EDGE NODES...']);
      if (currentProgress === 70) setLogs(prev => [...prev, '> SYNCING LABTECH_DATABASE...']);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setLogs(prev => [...prev, '', '✅ SUCCESS: LABTECH_STACK v4.0 DEPLOYED 🚀', '> LIVE AT: elite.labtech.ai']);
        
        // Auto-Reset após 5 segundos de glória
        setTimeout(resetTerminal, 5000);
      }
    }, 50);
  };

  return (
    <div className="relative group/term h-full">
      <div className="bg-[#0A0D14] rounded-3xl border border-white/5 shadow-2xl overflow-hidden h-full flex flex-col relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        
        <div className="flex items-center justify-between p-6 bg-white/5 border-b border-white/5">
           <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                 <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_8px_#FF5F56]" />
                 <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_#FFBD2E]" />
                 <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_8px_#27C93F]" />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">labtech_os // v4.0.2</span>
           </div>
           
           <button 
             onClick={runSimulation}
             disabled={isRunning && progress < 100}
             className={`flex items-center gap-2 px-5 py-2 rounded-full font-black text-[10px] transition-all ${
               isRunning && progress < 100 
               ? 'bg-slate-800 text-slate-400 cursor-not-allowed' 
               : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white shadow-lg shadow-emerald-500/10'
             }`}
           >
              {isRunning && progress < 100 ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} className="fill-current" />}
              {progress >= 100 ? 'SUCCESS' : 'EXECUTE'}
           </button>
        </div>

        <div key={cycleKey} className="flex-grow p-8 font-mono text-sm overflow-hidden flex flex-col gap-3">
           {/* Line 01 */}
           <div className="flex gap-4">
              <span className="text-slate-700">01</span>
              <p className="text-white tracking-tight">
                 <TypewriterText text="import { EliteDev } from '@labtech/core';" onComplete={() => setActiveLine(1)} />
              </p>
           </div>
           
           {/* Line 02 */}
           <div className={`flex gap-4 transition-opacity duration-500 ${activeLine >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-slate-700">02</span>
              <p className="text-white tracking-tight">
                 {activeLine >= 1 && <TypewriterText text="const student = new EliteDev();" delay={200} onComplete={() => setActiveLine(2)} />}
              </p>
           </div>
           
           {/* Line 03 */}
           <div className={`flex gap-4 transition-opacity duration-500 ${activeLine >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-slate-700">03</span>
              <p className="text-white tracking-tight">
                 {activeLine >= 2 && <TypewriterText text="await student.deploy({ env: 'GLOBAL' });" delay={200} onComplete={() => setActiveLine(3)} />}
              </p>
           </div>
           
           <AnimatePresence>
             {isRunning && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 10 }}
                 className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-2"
               >
                  <div className="w-full h-1.5 bg-white/5 rounded-full mb-4 overflow-hidden">
                     <motion.div 
                       className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" 
                       style={{ width: `${progress}%` }}
                     />
                  </div>
                  
                  <div className="flex flex-col gap-1.5 h-40 overflow-y-auto pr-2 custom-scrollbar text-[11px]">
                     {logs.map((log, i) => (
                       <motion.p 
                         key={i} 
                         initial={{ x: -10, opacity: 0 }}
                         animate={{ x: 0, opacity: 1 }}
                         className={`font-bold ${log.startsWith('✅') ? 'text-emerald-400' : 'text-slate-500'}`}
                       >
                         {log}
                       </motion.p>
                     ))}
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
      
      <div className="absolute -right-8 -bottom-8 p-8 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl hidden lg:block hover:scale-110 transition-transform">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
               <CheckCircle2 size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-1">Architecture</p>
               <p className="text-sm font-black text-white italic">100% Validated</p>
            </div>
         </div>
      </div>
    </div>
  );
};

const HeroSection = ({ onOpenAuth }: { onOpenAuth: () => void }) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  
  const mouseXSpring = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 40;
    const y = (clientY / innerHeight - 0.5) * 40;
    setMouseX(x);
    setMouseY(y);
  };

  return (
    <section id="home" onMouseMove={handleMouseMove} className="relative min-h-[100vh] pt-40 md:pt-48 pb-20 flex items-center justify-center overflow-hidden mesh-gradient cursor-default">
      <motion.div 
        style={{ x: mouseXSpring, y: mouseYSpring }}
        className="absolute inset-0 pointer-events-none -z-20 opacity-30 dark:opacity-50"
      >
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none -z-10 opacity-30">
          {[1, 2, 3, 4, 5, 6].map((i) => (
             <motion.div
               key={i}
               initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
               animate={{ y: ["-10%", "110%"], x: ["0%", "10%"] }}
               transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
               className="w-2 h-2 bg-primary rounded-full blur-[4px] absolute"
             />
          ))}
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative z-20 flex flex-col items-center lg:items-start text-center lg:text-left gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full"
          >
            <Sparkles size={16} className="text-secondary animate-pulse" />
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em] leading-none">Plataforma de Alta Fidelidade</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black text-slate-900 dark:text-white uppercase tracking-[-0.04em] leading-[0.9] flex flex-col">
            <span>FORJE SEU</span>
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent italic animate-gradient-x drop-shadow-sm px-2 mt-4 lg:mt-6 pb-2">PODER TECH</span>
          </h1>

          <p className="max-w-xl text-lg md:text-xl text-slate-500 dark:text-slate-400 font-bold leading-relaxed border-l-4 border-primary/20 lg:border-l-0 lg:border-r-4 lg:pr-10 lg:text-right italic">
             A primeira trilha gamificada de elite do Brasil. Saia do tutorial e entre no laboratório das maiores Big Techs do planeta.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.button 
              onClick={onOpenAuth}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ x: mouseXSpring, y: mouseYSpring }}
              className="relative group/btn w-full sm:w-auto px-10 py-5 bg-primary text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 overflow-hidden shadow-[0_15px_40px_rgba(139,92,246,0.3)] transition-shadow outline-none"
            >
              <span className="relative z-10">Quero ser Elite</span>
              <ArrowRight size={24} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:transition-transform duration-1000" />
            </motion.button>
            <a href="#method" className="w-full sm:w-auto px-8 py-5 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all">
               Ver método
            </a>
          </div>
        </div>

        <div className="relative group perspective-1000 mt-40 md:mt-0">
           {/* Floating AI Mentor Mascot - High-Fidelity SVG Component */}
           <motion.div
             initial={{ opacity: 0, scale: 0.8, y: 20 }}
             animate={{ 
               opacity: 1, 
               scale: 1, 
               y: [0, -30, 0],
             }}
             transition={{ 
               opacity: { duration: 0.8 },
               scale: { duration: 0.8 },
               y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
             }}
             className="absolute -top-[180px] md:-top-[220px] left-1/2 -translate-x-1/2 w-[280px] md:w-[350px] pointer-events-none z-30"
           >
              <AIMascot />
           </motion.div>

           {/* Floating Tech Fragments (Lucide) */}
           <motion.div
             animate={{ y: [0, -30, 0], rotate: [0, 45, 0] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -top-12 -right-24 text-primary/60 bg-white/5 p-6 rounded-[2.5rem] backdrop-blur-3xl border border-white/10 z-40 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-primary/20"
           >
              <Code2 size={48} />
           </motion.div>

           <motion.div
             animate={{ y: [0, 30, 0], rotate: [0, -25, 0] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-20 -left-28 text-secondary/60 bg-white/5 p-5 rounded-[1.8rem] backdrop-blur-3xl border border-white/10 z-0 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-secondary/20"
           >
              <Zap size={40} />
           </motion.div>

           <motion.div
             initial={{ opacity: 0, rotateY: 15 }}
             animate={{ opacity: 1, rotateY: -15 }}
             transition={{ duration: 1.5 }}
             className="relative z-20"
           >
              <Terminal />
           </motion.div>
           
           {/* Abstract Depth Glows */}
           <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 blur-[80px] -z-10 animate-pulse" />
           <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-secondary/10 blur-[100px] -z-10 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
