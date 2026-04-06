/**
 * LabTechAI - Mentor Chat Component
 * Interface de chat flutuante para auxílio do aluno.
 */

class MentorChat {
  constructor() {
    this.isOpen = false;
    this.messages = [
      { role: 'ai', text: 'Olá! Sou o Mentor LabTech. Como posso te ajudar hoje?' }
    ];
    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.id = 'mentor-chat-widget';
    this.container.className = 'glass';
    this.container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 350px;
      height: 500px;
      border-radius: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: translateY(120%);
      transition: transform 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
      border: 1px solid var(--glass-border);
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    `;

    this.render();
    document.body.appendChild(this.container);
    this.createTrigger();
  }

  createTrigger() {
    const trigger = document.createElement('button');
    trigger.id = 'chat-trigger';
    trigger.className = 'btn-primary';
    trigger.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      z-index: 10001;
      border: none;
      box-shadow: 0 5px 15px rgba(124, 77, 255, 0.4);
    `;
    trigger.innerHTML = '<i class="fa-solid fa-comment-dots"></i>';
    trigger.onclick = () => this.toggle();
    document.body.appendChild(trigger);
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.container.style.transform = this.isOpen ? 'translateY(0)' : 'translateY(120%)';
    const triggerIcon = document.querySelector('#chat-trigger i');
    triggerIcon.className = this.isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-comment-dots';
  }

  render() {
    this.container.innerHTML = `
      <div class="chat-header" style="background: var(--primary-color); padding: 15px; display: flex; align-items: center; gap: 10px;">
        <div style="background: white; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary-color);">
          <i class="fa-solid fa-robot"></i>
        </div>
        <div>
          <div style="font-weight: 700; font-size: 14px;">Mentor LabTech</div>
          <div style="font-size: 10px; opacity: 0.8;">Online agora</div>
        </div>
      </div>
      
      <div id="chat-messages" style="flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: rgba(0,0,0,0.2);">
        ${this.messages.map(msg => `
          <div class="msg ${msg.role}" style="
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 15px;
            font-size: 13px;
            ${msg.role === 'ai' 
              ? 'background: var(--bg-tertiary); align-self: flex-start; border-bottom-left-radius: 2px;' 
              : 'background: var(--primary-color); align-self: flex-end; border-bottom-right-radius: 2px;'}
          ">${msg.text}</div>
        `).join('')}
      </div>

      <div class="chat-input" style="padding: 15px; background: var(--bg-secondary); border-top: 1px solid var(--glass-border); display: flex; gap: 10px;">
        <input type="text" id="chat-input-field" placeholder="Pergunte algo..." style="flex: 1; background: transparent; border: none; outline: none; color: white;">
        <button id="send-btn" style="background: transparent; border: none; color: var(--primary-color); cursor: pointer; font-size: 18px;">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    `;

    setTimeout(() => this.setupListeners(), 10);
  }

  setupListeners() {
    const input = document.getElementById('chat-input-field');
    const btn = document.getElementById('send-btn');
    
    const send = () => {
      const text = input.value.trim();
      if (!text) return;
      this.addMessage('user', text);
      input.value = '';
      
      this.handleAIResponse(text);
    };

    btn.onclick = send;
    input.onkeypress = (e) => { if (e.key === 'Enter') send(); };
  }

  handleAIResponse(userText) {
    const text = userText.toLowerCase();
    let response = "Interessante! O que mais você gostaria de saber sobre esse tópico?";

    if (text.includes('ajuda') || text.includes('como')) {
      response = "Estou aqui para ajudar! Você pode me perguntar sobre variáveis, condições (if) ou repetições (loops).";
    } else if (text.includes('variável') || text.includes('gaveta')) {
      response = "Variáveis são como gavetas! Elas guardam valores para a gente usar depois. Use 'let' para criar uma!";
    } else if (text.includes('if') || text.includes('condição')) {
      response = "O 'if' é como uma bifurcação na estrada. Se a condição for verdadeira, o código segue um caminho!";
    } else if (text.includes('loop') || text.includes('repetir')) {
      response = "Loops servem para não precisarmos escrever o mesmo código várias vezes. O 'for' é o rei dos loops!";
    } else if (text.includes('xp') || text.includes('nível')) {
      response = "Você ganha XP completando aulas e exercícios! Quanto mais você pratica, mais rápido sobe de nível.";
    }

    setTimeout(() => {
      this.addMessage('ai', response);
    }, 1000);
  }

  addMessage(role, text) {
    this.messages.push({ role, text });
    this.render();
    const container = document.getElementById('chat-messages');
    container.scrollTop = container.scrollHeight;
  }
}

// Global Init
window.addEventListener('DOMContentLoaded', () => {
  window.mentorChat = new MentorChat();
});
