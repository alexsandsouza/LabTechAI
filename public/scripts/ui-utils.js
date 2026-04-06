/**
 * LabTechAI - Utilitários de UI
 * Toast, Progress Bars, Audio Feedback.
 */

class UIUtils {
  constructor() {
    this.toastContainer = this.createToastContainer();
    this.audioCtx = null;
    this.sounds = {
      click: 'project/assets/audio/click.mp3',
      success: 'project/assets/audio/success.mp3',
      badge: 'project/assets/audio/badge.mp3',
      levelUp: 'project/assets/audio/levelup.mp3'
    };
    
    // Iniciar áudio ao primeiro clique do usuário
    window.addEventListener('click', () => this.initAudio(), { once: true });
  }

  initAudio() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  createToastContainer() {
    const container = document.createElement('div');
    container.id = 'lab-toast-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(container);
    return container;
  }

  showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `glass lab-toast lab-toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content" style="padding: 12px 20px; border-radius: 12px; display: flex; align-items: center; gap: 10px; border-left: 4px solid var(--primary-color);">
        <span class="toast-icon">✨</span>
        <span class="toast-text">${message}</span>
      </div>
    `;
    
    this.toastContainer.appendChild(toast);
    
    // Animate in
    toast.animate([
      { opacity: 0, transform: 'translateX(50px)' },
      { opacity: 1, transform: 'translateX(0)' }
    ], { duration: 300, easing: 'cubic-bezier(0.18, 0.89, 0.32, 1.28)' });

    // Remove
    setTimeout(() => {
      toast.animate([
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: 'translateX(50px)' }
      ], { duration: 300, easing: 'ease-in' }).onfinish = () => toast.remove();
    }, duration);
  }

  showXpGain(amount) {
    this.showToast(`+${amount} XP Gained!`, 'xp');
    this.playSound('success');
  }

  playSound(key) {
    if (!window.stateManager.state.settings.sound || !this.audioCtx) return;

    // Fallback simple oscillator sound if file check fails (simulated)
    try {
      this.playSyntheticSound(key);
    } catch (e) {
      console.warn('Audio synthesis failed:', e);
    }
  }

  playSyntheticSound(type) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    
    const now = this.audioCtx.currentTime;

    switch(type) {
      case 'click':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      case 'success':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      case 'levelUp':
        // Arpeggio
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const o = this.audioCtx.createOscillator();
          const g = this.audioCtx.createGain();
          o.type = 'square';
          o.frequency.setValueAtTime(freq, now + (i * 0.1));
          g.gain.setValueAtTime(0.05, now + (i * 0.1));
          g.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.1) + 0.3);
          o.connect(g);
          g.connect(this.audioCtx.destination);
          o.start(now + (i * 0.1));
          o.stop(now + (i * 0.1) + 0.3);
        });
        break;
    }
  }

  createSkeleton(height = '20px', width = '100%') {
    return `
      <div class="skeleton" style="height: ${height}; width: ${width}; background: linear-gradient(90deg, #13152e 25%, #1b1e3d 50%, #13152e 75%); background-size: 200% 100%; border-radius: 8px; animation: skeleton-pulse 1.5s infinite linear;"></div>
    `;
  }
}

// Global Export
window.ui = new UIUtils();

// CSS dinâmico para os toasts
const toastStyle = document.createElement('style');
toastStyle.textContent = `
  @keyframes skeleton-pulse {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .lab-toast {
    pointer-events: auto;
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(toastStyle);
