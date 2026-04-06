import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, ArrowRight, X, User } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center gap-3 group cursor-pointer select-none">
    <div className="relative w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all duration-700 animate-pulse" />
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="relative group-hover:scale-110 transition-transform duration-500">
        <path d="M50 5L89.5 27.5V72.5L50 95L10.5 72.5V27.5L50 5Z" stroke="url(#logo-grad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="35" y="35" width="30" height="30" rx="6" fill="url(#logo-grad)" fillOpacity="0.8" className="animate-pulse" />
        <circle cx="50" cy="50" r="6" fill="white" className="animate-ping" />
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="100" y2="100">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div className="flex flex-col">
      <div className="text-xl lg:text-2xl font-black tracking-[-0.03em] flex items-center leading-none">
        <span className="text-slate-900 dark:text-white uppercase transition-all">Lab</span>
        <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent italic px-1">Tech</span>
        <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-md ml-1 font-black shadow-lg shadow-primary/20">AI</span>
      </div>
      <span className="text-[8px] lg:text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] ml-1.5 mt-1 leading-none opacity-60">Academy</span>
    </div>
  </div>
);

const Header = ({ onOpenAuth }: { onOpenAuth: () => void }) => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const darkMode = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { name: 'O Método', href: '#method' },
    { name: 'Módulos', href: '#modules' },
    { name: 'Elite Path', href: '#process' },
    { name: 'Preços', href: '#pricing' },
  ];

  return (
    <div className="fixed top-0 w-full z-[60] flex justify-center pointer-events-none pt-8 lg:pt-10 px-5 lg:px-10">
      <header className={`transition-all duration-700 ease-out pointer-events-auto flex items-center justify-between px-8 lg:px-10 py-4 lg:py-5 rounded-full relative group overflow-visible ${
        isScrolled 
        ? 'w-full max-w-7xl bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-3xl shadow-[0_30px_100px_rgba(139,92,246,0.15)] dark:shadow-[0_30px_100px_rgba(139,92,246,0.3)] border border-primary/20 -translate-y-2' 
        : 'w-full max-w-7xl bg-transparent border border-transparent'
      }`}>
        
        {/* Animated Scanning Line Border */}
        <div className={`absolute inset-0 rounded-full border border-primary/20 pointer-events-none transition-opacity duration-700 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute top-0 left-0 w-40 h-[1.5px] bg-gradient-to-r from-transparent via-primary to-transparent -translate-x-full animate-scanning-line opacity-0 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-0 right-0 w-40 h-[1.5px] bg-gradient-to-r from-transparent via-secondary to-transparent translate-x-full animate-scanning-line-reverse opacity-0 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />

        <a href="#" className="shrink-0 transition-transform hover:scale-105 active:scale-95 z-10 mr-12 lg:mr-16">
          <Logo />
        </a>

        {/* Desktop Nav + Hub Container */}
        <div className="hidden lg:flex items-center flex-grow justify-between">
          <nav className="flex items-center gap-6 xl:gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 z-10 shrink-0">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-primary transition-all relative group/item whitespace-nowrap">
                {link.name}
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-slate-200 dark:bg-slate-800 rounded-full scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 delay-100 origin-left shadow-[0_0_8px_#8B5CF6]" />
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-6 lg:gap-10 pl-10 border-l border-slate-200 dark:border-white/5 ml-6">
            <div className="hidden xl:flex items-center gap-4 pr-6 border-r border-slate-100 dark:border-white/5">
               <div className="relative">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] animate-pulse" />
                  <div className="absolute inset-x-0 inset-y-0 bg-emerald-500 rounded-full animate-ping opacity-40 scale-[2.5]" />
               </div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-900 dark:text-white leading-none tabular-nums">
                     {Math.floor(140 + Math.random() * 8)} Elites
                  </span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1 opacity-60">Online Now</span>
               </div>
            </div>

            {/* XP Level Innovation */}
            <div className="hidden 2xl:flex flex-col gap-2 min-w-[130px] bg-slate-50 dark:bg-white/5 px-5 py-2.5 rounded-2xl border border-slate-100 dark:border-white/5 group/xp cursor-pointer">
               <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[9px] font-black text-primary uppercase tracking-widest">Level 01</span>
                  <span className="text-[8px] font-bold text-slate-400 opacity-60 tabular-nums">50/100 XP</span>
               </div>
               <div className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '50%' }}
                    className="h-full bg-primary shadow-[0_0_8px_#8B5CF6]"
                  />
               </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-6">
              <button onClick={toggleTheme} className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center hover:scale-110 hover:border-primary/30 transition-all shadow-sm group">
                {isDark ? <Sun size={20} className="text-yellow-400 group-hover:rotate-90 transition-all duration-500" /> : <Moon size={20} className="text-primary group-hover:-rotate-12 transition-all duration-500" />}
              </button>
              <button onClick={onOpenAuth} className="flex items-center gap-3 px-8 lg:px-10 py-4 bg-primary text-white rounded-full font-black shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-xs group relative overflow-hidden shrink-0">
                <span className="relative z-10 flex items-center gap-2 uppercase tracking-widest">
                  Área do aluno <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-4 z-10">
           <button onClick={toggleTheme} className="w-12 h-12 flex items-center justify-center text-slate-700 dark:text-slate-300 rounded-full bg-slate-100 dark:bg-slate-800 shadow-sm border border-black/5 dark:border-white/5 active:scale-90 transition-all">
             {isDark ? <Sun size={22} /> : <Moon size={22} />}
           </button>
           <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`w-14 h-14 flex items-center justify-center rounded-full shadow-2xl transition-all duration-500 active:scale-90 relative overflow-visible ${
                isMenuOpen 
                ? 'bg-rose-500 text-white rotate-90 shadow-rose-500/20' 
                : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-black/20 dark:shadow-white/10 hover:scale-105'
              }`}
            >
             {isMenuOpen ? <X size={26} strokeWidth={3} /> : <Menu size={26} strokeWidth={3} />}
             
             {/* Pulsing ring for the menu button */}
             <div className={`absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20 pointer-events-none ${isMenuOpen ? 'hidden' : 'block'}`} />
           </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-[110%] left-0 right-0 bg-white dark:bg-[#0F172A] backdrop-blur-3xl rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.3)] p-10 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] -z-10" />
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-3xl font-black uppercase text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800/50 py-6 flex justify-between items-center group transition-all hover:pl-4 hover:text-primary">
                {link.name}
                <ArrowRight size={26} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </a>
            ))}
            <button onClick={() => { setIsMenuOpen(false); onOpenAuth(); }} className="w-full py-6 bg-primary text-white text-center rounded-[2rem] font-black text-xl mt-8 flex items-center justify-center gap-4 shadow-2xl shadow-primary/30 active:scale-95 transition-all">
               <User size={28} /> Login Elite
            </button>
          </div>
        )}
      </header>
      
      <style>{`
        @keyframes scanning-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(800%); }
        }
        @keyframes scanning-line-reverse {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-800%); }
        }
        .animate-scanning-line {
          animation: scanning-line 3s linear infinite;
        }
        .animate-scanning-line-reverse {
          animation: scanning-line-reverse 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Header;
