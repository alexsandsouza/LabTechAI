import { Globe, Send, ArrowRight, Code } from 'lucide-react';

interface FooterLink {
  name: string;
  href: string;
  beta?: boolean;
}

const FooterLogo = () => (
  <div className="flex flex-col gap-1 group cursor-pointer select-none">
    <div className="text-2xl font-black tracking-tighter flex items-center leading-none">
      <span className="text-slate-900 dark:text-white uppercase tracking-[-0.05em]">Lab</span>
      <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent italic px-1">Tech</span>
      <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-md ml-1 font-black">AI</span>
    </div>
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] ml-0.5 leading-none opacity-60">Academy</span>
  </div>
);

const Footer = ({ onOpenLegal }: { onOpenLegal: (type: 'terms' | 'privacy') => void }) => {
  const links: Record<string, FooterLink[]> = {
    Plataforma: [
      { name: 'O Método', href: '#method' },
      { name: 'Módulos', href: '#modules' },
      { name: 'Elite Path', href: '#process' },
      { name: 'Preços', href: '#pricing' },
    ],
    Comunidade: [
      { name: 'Elite Discord', href: '#', beta: true },
      { name: 'Eventos Hub', href: '#', beta: true },
      { name: 'Fórum Lab', href: '#', beta: true },
    ],
    Suporte: [
      { name: 'FAQ', href: '#faq' },
      { name: 'Terms', href: 'terms' },
      { name: 'Privacy', href: 'privacy' },
    ]
  };

  const handleLinkClick = (e: React.MouseEvent, item: FooterLink) => {
    if (item.href === 'terms' || item.href === 'privacy') {
      e.preventDefault();
      onOpenLegal(item.href as 'terms' | 'privacy');
    }
  };

  return (
    <footer className="pt-24 pb-12 bg-white dark:bg-[#0F172A] border-t border-slate-100 dark:border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-20" />
      
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          
          <div className="lg:col-span-2 flex flex-col gap-6">
            <FooterLogo />
            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-sm">
              O ecossistema definitivo para transformar iniciantes em profissionais de elite. Acelerado por IA, validado pelo mercado.
            </p>
            <div className="flex items-center gap-4">
               {[Code, Send, Globe].map((Icon, i) => (
                 <a key={i} href="#" className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm group">
                    <Icon size={18} className="group-hover:scale-110 transition-transform" />
                 </a>
               ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="flex flex-col gap-6">
               <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white underline decoration-primary/50 decoration-2 underline-offset-8">
                 {title}
               </h4>
               <div className="flex flex-col gap-4 text-sm font-bold">
                  {items.map(item => (
                    <a 
                      key={item.name} 
                      href={item.href} 
                      onClick={(e) => handleLinkClick(e, item)}
                      className="text-slate-500 dark:text-slate-500 hover:text-primary dark:hover:text-white transition-colors flex items-center justify-between group/link"
                    >
                      {item.name}
                      {item.beta && (
                        <span className="text-[8px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-md opacity-60 group-hover/link:opacity-100 transition-opacity">SOON</span>
                      )}
                    </a>
                  ))}
               </div>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-2 text-xs font-bold text-slate-400">
             <span>© 2026 LabTechAI Academy.</span>
             <span className="hidden md:block">|</span>
             <span>Designed with Passion by Alexsander.</span>
          </div>

          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Online</span>
             </div>
             <a href="#" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white hover:text-primary transition-colors">
                Back to Top <ArrowRight size={14} className="-rotate-90" />
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
