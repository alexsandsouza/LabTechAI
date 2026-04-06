import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const techs = [
  { name: 'React', color: 'text-[#61DAFB]', glow: 'bg-[#61DAFB]/20', icon: '⚛️' },
  { name: 'JavaScript', color: 'text-[#F7DF1E]', glow: 'bg-[#F7DF1E]/20', icon: 'JS' },
  { name: 'TypeScript', color: 'text-[#3178C6]', glow: 'bg-[#3178C6]/20', icon: 'TS' },
  { name: 'Node.js', color: 'text-[#339933]', glow: 'bg-[#339933]/20', icon: '🟢' },
  { name: 'Tailwind', color: 'text-[#06B6D4]', glow: 'bg-[#06B6D4]/20', icon: '🌊' },
  { name: 'Next.js', color: 'text-slate-900 dark:text-white', glow: 'bg-slate-400/20', icon: '▲' },
  { name: 'Python', color: 'text-[#3776AB]', glow: 'bg-[#3776AB]/30', icon: '🐍' },
  { name: 'PostgreSQL', color: 'text-[#4169E1]', glow: 'bg-[#4169E1]/30', icon: '🐘' },
];

const TechStack = () => {
  return (
    <section className="py-24 bg-slate-50/50 dark:bg-[#080E1C] relative overflow-hidden">
      {/* Decorative center line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full shadow-[0_0_20px_#8B5CF6] z-10" />

      <div className="max-w-7xl mx-auto px-5 lg:px-10 mb-20 text-center">
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.6em] mb-4 block">Ecosistema de Tecnologia</span>
        <h3 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Stack do <span className="text-primary italic">Futuro</span></h3>
      </div>

      {/* Infinite Marquee with Larger Cards */}
      <div className="relative flex overflow-x-hidden">
        <div className="py-12 animate-marquee flex items-center whitespace-nowrap">
          {[...techs, ...techs].map((tech, i) => (
            <div key={i} className="mx-10 group cursor-default">
              <div className="relative flex items-center gap-6 px-14 py-8 bg-white dark:bg-slate-800/40 rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 shadow-sm group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-all duration-500 backdrop-blur-2xl">
                 {/* Internal Glow on Hover */}
                 <div className={`absolute inset-x-4 -inset-y-4 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-[40px] -z-10 ${tech.glow}`} />
                 
                 <div className={`text-5xl font-black ${tech.color} group-hover:rotate-12 transition-transform duration-500`}>{tech.icon}</div>
                 <span className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tighter">{tech.name}</span>
                 
                 {/* Shine effect */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TechStack;
