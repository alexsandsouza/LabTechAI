# 🚀 LabTechAI - Guia de Implementação e Uso

A **LabTechAI** foi construída como uma plataforma "EDTECH PREMIUM", focada em micro-interações, gamificação profunda e uma interface SaaS moderna (Dark Mode & Glassmorphism).

## 🏗️ Arquitetura do Sistema (Modular)

A plataforma utiliza **Vanilla JavaScript Modular**, o que significa que não depende de frameworks (React/Vue), garantindo performance instantânea e facilidade de manutenção.

| Camada | Arquivo Principal | Função |
| :--- | :--- | :--- |
| **Estado** | `state.js` | Gerencia XP, Níveis, Badges e progresso via `LocalStorage`. |
| **Dados** | `courses.js` | Estrutura de módulos, aulas (slides) e desafios de código. |
| **UI Engine** | `ui-utils.js` | Notificações (Toasts), Sons Sintetizados e esqueletos de carregamento. |
| **Logic** | `app.js` | Orquestração global, eventos de Level Up e Streak (ofensiva). |
| **Dashboard** | `dashboard.js` | Renderização dinâmica do mapa da trilha e lógica de desbloqueio. |

## ✨ Destaques de Gamificação

1.  **Trilha Visual Dinâmica**: O mapa de aulas bloqueia níveis futuros até que você conclua os atuais.
2.  **XP e Level-Up**: Cada aula concluída gera XP. Ao atingir metas, o usuário sobe de nível com animações de confete 🎉 e chimes sonoros.
3.  **Sistema de Ofensiva (Streak)**: Monitora dias consecutivos de acesso.
4.  **Feedback Sensorial**: Sons sintetizados via `Web Audio API` para cliques e vitórias, sem necessidade de arquivos externos pesados.

## 🧪 Laboratório de Código (Exercícios)

O editor de código em `pages/exercise.html` valida as respostas do usuário em tempo real:
-   **Execução Simulada**: Validação por string e lógica para garantir que o aluno entendeu o conceito.
-   **Dicas Dinâmicas**: Se o aluno errar, o sistema oferece uma pista (Hint).
-   **Suporte a Tecla TAB**: Ajustado para comportamento de editor real.

---

### 📂 Como Visualizar o Projeto
1. Abra o arquivo [project/index.html](file:///c:/Users/alexs/OneDrive/Documentos/LabTechAI/project/index.html) no seu navegador.
2. Comece pelo **"Módulo 1: Variáveis e Tipos"**.
3. Complete a aula e desbloqueie o primeiro **Desafio de Código**.

---
> [!TIP]
> Use o botão **"RESET"** no rodapé do Dashboard para apagar seu progresso local e recomeçar a jornada do zero sempre que precisar testar!

> [!IMPORTANT]
> A LabTechAI foi projetada Seguindo princípios de **Mobile-First**, funcionando perfeitamente em Tablets e Smartphones.
