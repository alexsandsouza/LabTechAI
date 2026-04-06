import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Scale, ScrollText, CheckCircle2, Lock } from 'lucide-react';

interface LegalModalProps {
  type: 'terms' | 'privacy';
  isOpen: boolean;
  onClose: () => void;
}

const LegalModal = ({ type, isOpen, onClose }: LegalModalProps) => {
  const isTerms = type === 'terms';

  const content = isTerms ? {
    title: 'Termos de Uso',
    subtitle: 'Contrato de Adesão Elite Academy v1.1',
    icon: <Scale size={32} />,
    sections: [
      {
        title: '1. Objeto do Serviço',
        text: 'O LabTechAI fornece acesso a um ambiente de simulação de laboratório de software, mentoria via Inteligência Artificial e trilhas de aprendizado gamificadas para capacitação técnica.'
      },
      {
        title: '2. Licença de Uso do Código',
        text: 'O conteúdo didático é de propriedade intelectual da LabTechAI. Os códigos desenvolvidos pelo ESTUDANTE durante as aulas são de sua exclusiva propriedade intelectual, podendo ser utilizados livremente em seus portfólios.'
      },
      {
        title: '3. Assinatura e Pagamentos',
        text: 'O acesso ao plano Elite Pro é recorrente (mensal ou anual). O cancelamento pode ser efetuado através do dashboard a qualquer momento, interrompendo a renovação automática para o ciclo seguinte.'
      },
      {
        title: '4. Conduta e Comunidade',
        text: 'O compartilhamento de credenciais de acesso ou a reprodução não autorizada do conteúdo pedagógico constitui quebra contratual, acarretando na rescisão imediata sem direito a reembolso.'
      }
    ]
  } : {
    title: 'Política de Privacidade',
    subtitle: 'Conformidade LGPD (Lei 13.709/2018) & ANPD',
    icon: <Shield size={32} />,
    sections: [
      {
        title: '1. Tratamento de Dados & Finalidade',
        text: 'Em estrita conformidade com a LGPD, coletamos dados (Nome, e-mail e ID de perfil via SSO Google/GitHub) com a finalidade exclusiva de execução de contrato (Trilha de Aprendizado) e personalização da UX.'
      },
      {
        title: '2. Direitos do Titular (Art. 18 LGPD)',
        text: 'Garantimos ao aluno o direito de confirmação da existência de tratamento, acesso, correção de dados incompletos, portabilidade e a eliminação definitiva de seus dados mediante solicitação.'
      },
      {
        title: '3. Segurança e Retenção',
        text: 'Adotamos medidas técnicas e administrativas (criptografia AES-256) para proteger seus dados contra acessos não autorizados. Os dados são retidos enquanto durar o vínculo contratual ou até a revogação do consentimento.'
      },
      {
        title: '4. Canal de Atendimento (DPO)',
        text: 'Para exercer seus direitos de titular, entre em contato com nosso Encarregado de Dados (DPO) através do e-mail: dpo@labtechai.com. Respondemos em conformidade com os prazos da ANPD.'
      }
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-5 lg:p-10 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl pointer-events-auto"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="relative w-full max-w-5xl bg-white dark:bg-[#0F172A] rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto flex flex-col h-full max-h-[90vh] border border-white/5"
          >
             <div className="p-10 lg:p-14 bg-gradient-to-r from-slate-50 to-white dark:from-[#131B2E] dark:to-[#0F172A] border-b border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                      {content.icon}
                   </div>
                   <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 block">{content.subtitle}</span>
                      <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">{content.title}</h2>
                   </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-14 h-14 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all active:scale-90"
                >
                   <X size={24} />
                </button>
             </div>

             <div className="flex-grow p-10 lg:p-14 overflow-y-auto custom-scrollbar flex flex-col gap-14">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                   {content.sections.map((section, i) => (
                     <div key={i} className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                              <CheckCircle2 size={16} />
                           </div>
                           <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{section.title}</h3>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed text-sm lg:text-base italic pl-11">
                           {section.text}
                        </p>
                     </div>
                   ))}
                </div>

                {!isTerms && (
                  <div className="p-8 bg-blue-500/5 rounded-3xl border border-blue-500/20 flex flex-col md:flex-row items-center gap-6">
                     <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                        <Lock size={24} />
                     </div>
                     <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                        Este documento foi estruturado conforme as diretrizes recomendadas pela <span className="text-blue-500">Autoridade Nacional de Proteção de Dados (ANPD)</span> para garantir a transparência no tratamento de dados sensíveis e pessoais em ambientes de tecnologia e educação.
                     </p>
                  </div>
                )}

                <div className="mt-auto p-10 bg-slate-50 dark:bg-white/[0.02] rounded-[2.5rem] border border-slate-100 dark:border-white/5 border-dashed">
                   <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                      <div className="flex items-center gap-4">
                         <ScrollText size={24} className="text-slate-400" />
                         <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Doc v1.1 | Última revisão em: 06/04/2026</span>
                      </div>
                      <button 
                        onClick={onClose}
                        className="px-10 py-4 bg-primary text-white font-black text-sm rounded-2xl uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                      >
                         Concordar e Prosseguir
                      </button>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.2);
          border-radius: 20px;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default LegalModal;
