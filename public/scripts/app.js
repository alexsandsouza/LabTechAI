/**
 * LabTechAI - App Core
 * Inicialização e roteamento dinâmico.
 */

class App {
  constructor() {
    this.router = this.setupRouter();
    this.init();
  }

  async init() {
    console.log("🚀 LabTechAI Iniciando...");
    
    // Listen for events
    window.addEventListener('labtechai:xpAdded', (e) => {
      ui.showXpGain(e.detail.amount);
      this.updateGlobalHeader();
    });

    window.addEventListener('labtechai:levelUp', (e) => {
      ui.showToast(`NÍVEL ${e.detail.level} DESBLOQUEADO! 🎉`, 'level-up', 5000);
      ui.playSound('levelUp');
      this.triggerConfetti();
    });

    window.addEventListener('labtechai:achievementUnlocked', (e) => {
      const { title, desc } = e.detail;
      ui.showToast(`CONQUISTA: ${title}! 🏆 - ${desc}`, 'achievement', 6000);
      ui.playSound('success');
      this.triggerConfetti();
    });

    // Initial Render
    this.render();
    
    // Auto-save user streak logic
    this.checkStreak();
  }

  checkStreak() {
    const today = new Date().toDateString();
    const lastActive = stateManager.state.user.lastActive;
    
    if (lastActive !== today) {
      if (lastActive === new Date(Date.now() - 86400000).toDateString()) {
        stateManager.state.user.streak++;
      } else {
        stateManager.state.user.streak = 1;
      }
      stateManager.state.user.lastActive = today;
      stateManager.save();
    }
  }

  setupRouter() {
    const navigate = (page, params = {}) => {
      // In a real SPA, this would use History API
      // Since we are file-based, we use logic to show/hide sections or redirect
      const url = new URL(window.location.href);
      url.searchParams.set('page', page);
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
      window.history.pushState({}, '', url);
      this.render();
    };
    return { navigate };
  }

  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') || 'dashboard';
    
    // For specific pages (lesson, exercise), we check if we're in the right HTML file
    // Or we handle everything in index.html for a lighter feel
    const main = document.body;
    
    // Update Global Header
    this.updateGlobalHeader();
  }

  updateGlobalHeader() {
    const xpText = document.getElementById('xp-count');
    const levelText = document.getElementById('level-count');
    const streakText = document.getElementById('streak-count');
    const progressBar = document.getElementById('header-xp-bar');

    if (xpText) xpText.textContent = stateManager.state.user.xp;
    if (levelText) levelText.textContent = stateManager.state.user.level;
    if (streakText) streakText.textContent = stateManager.state.user.streak;
    
    if (progressBar) {
      const { xp, nextLevelXp } = stateManager.state.user;
      const pct = (xp / nextLevelXp) * 100;
      progressBar.style.width = `${pct}%`;
    }
  }

  triggerConfetti() {
    // Check if script is loaded
    if (window.confetti) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7c4dff', '#00e5ff', '#ff4081']
      });
    }
  }
}

// Global Export
window.app = new App();
