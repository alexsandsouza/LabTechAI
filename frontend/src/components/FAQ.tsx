import { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0 group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 lg:py-12 flex items-center justify-between text-left group-hover:text-primary transition-all text-slate-900 dark:text-white outline-none"
      >
        <span className="text-xl lg:text-3xl font-black uppercase tracking-tighter leading-tight max-w-2xl">{question}</span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${isOpen ? 'bg-primary text-white rotate-180 shadow-primary/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
           {isOpen ? <Minus size={22} /> : <Plus size={22} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pb-12 text-slate-600 dark:text-slate-400 text-lg lg:text-xl leading-relaxed font-bold border-l-4 border-primary/20 pl-8 italic">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "O Co-Piloto de IA realmente entende meu código?",
      answer: "Sim! Não é um chatbot comum. Nossa IA Mentor lê o seu repositório Git, identifica gargalos de performance e sugere melhorias de arquitetura baseada em padrões de Elite de Big Techs como Netflix e Uber."
    },
    {
      question: "Como o LabTechAI me ajuda a chegar nos R$ 10k+?",
      answer: "Nossa metodologia é 'Outcome-Focused'. Do Módulo 1 ao 12, você constrói um portfólio de alta fidelidade que prova capacidade técnica para salários internacionais. Te treinamos para negociação e LinkedIn de Elite."
    },
    {
      question: "Os projetos são reais ou apenas tutoriais?",
      answer: "Nada de tutoriais de 'fazer gelo'. Você constrói engines de pagamento escaláveis, sistemas de streaming com SSR e SaaS com IA integrada. Projetos que empresas reais contratariam hoje mesmo."
    },
    {
      question: "Quanto tempo preciso dedicar por dia?",
      answer: "O método é intenso, mas flexível. Recomendamos ao menos 1h diária de 'Deep Work' no laboratório para manter a consistência. Lembre-se: o top 1% não é forjado em maratonas de fim de semana, mas em hábito constante."
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0F172A] relative">
      <div className="max-w-4xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-4">Suporte</div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Dúvidas de Elite</h2>
        </div>

        <div className="flex flex-col">
           {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} />
           ))}
        </div>

        <div className="mt-20 p-10 rounded-[2.5rem] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 h-full relative overflow-hidden group">
           <div className="absolute inset-0 bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition-all -z-10" />
           <div className="flex flex-col gap-2">
              <h4 className="text-2xl font-black uppercase tracking-tighter">Ainda tem dúvidas?</h4>
              <p className="text-slate-400 font-medium">Fale agora com nosso suporte VIP no WhatsApp.</p>
           </div>
           <button className="px-8 py-4 bg-white text-slate-900 font-black rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
              Chamar no WhatsApp <ArrowRight size={20} />
           </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
