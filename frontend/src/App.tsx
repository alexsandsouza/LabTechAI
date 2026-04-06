import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TechStack from './components/TechStack';
import SocialProof from './components/SocialProof';
import Methodology from './components/Methodology';
import Roadmap from './components/Roadmap';
import ProcessSection from './components/ProcessSection';
import Pricing from './components/Pricing';
import MentorChat from './components/MentorChat';
import AuthModal from './components/AuthModal';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import CookieConsent from './components/CookieConsent';

const FadeInSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99] }}
  >
    {children}
  </motion.div>
);

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalType, setLegalType] = useState<'terms' | 'privacy'>('terms');
  
  const openLegal = (type: 'terms' | 'privacy') => {
    setLegalType(type);
    setIsLegalOpen(true);
  };
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-500 flex flex-col selection:bg-primary selection:text-white">
      <Header onOpenAuth={() => setIsAuthModalOpen(true)} />
      <main className="flex-grow overflow-x-hidden">
        <HeroSection onOpenAuth={() => setIsAuthModalOpen(true)} />
        
        <FadeInSection><TechStack /></FadeInSection>
        <FadeInSection><SocialProof /></FadeInSection>
        <FadeInSection><Methodology /></FadeInSection>
        <FadeInSection><Roadmap /></FadeInSection>
        <FadeInSection><ProcessSection /></FadeInSection>
        <FadeInSection><Pricing onOpenAuth={() => setIsAuthModalOpen(true)} /></FadeInSection>
        <FadeInSection><FAQ /></FadeInSection>
        
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary z-[100] origin-left shadow-[0_0_10px_#8B5CF6]"
          style={{ scaleX: scrollProgress }}
        />

        <FadeInSection>
          <section className="py-20 bg-white dark:bg-[#0F172A] flex flex-col items-center">
             <div className="max-w-4xl mx-auto px-5 text-center flex flex-col items-center gap-10">
                <h3 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
                   Pronto para ser a próxima <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient-x">Elite Tech?</span>
                </h3>
                <p className="max-w-xl text-lg text-slate-500 font-bold">Junte-se a mais de 2.400 alunos e comece sua jornada hoje mesmo.</p>
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-12 py-6 bg-primary text-white font-black text-2xl rounded-[2rem] shadow-2xl shadow-primary/30 hover:scale-110 active:scale-95 transition-all outline-none"
                >
                   Começar Agora Grátis
                </button>
             </div>
          </section>
        </FadeInSection>
      </main>
      <Footer onOpenLegal={openLegal} />
      <MentorChat />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <LegalModal type={legalType} isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
      <CookieConsent onOpenPrivacy={() => openLegal('privacy')} />


      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes glimmer-card {
          0% { transform: translateX(-100%) skewX(-20deg); }
          20% { transform: translateX(200%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
        .animate-glimmer-card {
           animation: glimmer-card 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
