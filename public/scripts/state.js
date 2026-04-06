/**
 * LabTechAI - Engine de Estado e Persistência
 * Gerencia progresso, XP, badges e sincronização com LocalStorage.
 */

const INITIAL_STATE = {
  user: {
    name: "Explorador",
    level: 1,
    xp: 0,
    nextLevelXp: 100,
    streak: 0,
    lastActive: null,
    badges: [],
    achievements: [] // IDs: 'first-step', 'logic-master', 'fast-coder'
  },
  progress: {
    // FORMATO: "course-id": { "lesson-id": { completed: true, xpEarned: 50, timestamp: ... } }
    courses: {},
    currentCourse: 'logica-programacao',
    lastLesson: null
  },
  settings: {
    darkMode: true,
    sound: true,
    notifications: true
  }
};

class StateManager {
  constructor() {
    this.key = 'LABTECHAI_STATE';
    this.state = this.load();
    this.listeners = [];
  }

  load() {
    const saved = localStorage.getItem(this.key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Erro ao carregar estado:", e);
        return INITIAL_STATE;
      }
    }
    return INITIAL_STATE;
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.state));
    this.notify();
    this.sync();
  }

  async sync() {
    const token = localStorage.getItem('LABTECHAI_TOKEN');
    if (!token) return;

    try {
      await fetch('/api/user/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(this.state.user)
      });
    } catch (e) {
      console.warn("Sync failed");
    }
  }

  reset() {
    this.state = { ...INITIAL_STATE };
    localStorage.removeItem('LABTECHAI_TOKEN');
    this.save();
  }

  // --- User Stats ---
  addXp(amount) {
    const oldLevel = this.state.user.level;
    this.state.user.xp += amount;
    
    // Level Up Logic
    while (this.state.user.xp >= this.state.user.nextLevelXp) {
      this.state.user.xp -= this.state.user.nextLevelXp;
      this.state.user.level += 1;
      this.state.user.nextLevelXp = Math.floor(this.state.user.nextLevelXp * 1.5);
    }
    
    if (this.state.user.level > oldLevel) {
       this.emit('levelUp', { level: this.state.user.level });
    }
    
    this.checkMilestones();
    this.save();
    this.emit('xpAdded', { amount, currentXp: this.state.user.xp });
  }

  checkMilestones() {
    const xp = this.state.user.xp + (this.state.user.level * 100);
    const achievements = this.state.user.achievements;
    
    if (xp >= 100 && !achievements.includes('first-step')) {
       this.unlockAchievement('first-step', 'Primeiro Passo', 'Ganhou seus primeiros 100 XP!');
    }
    if (this.state.user.level >= 3 && !achievements.includes('logic-master')) {
       this.unlockAchievement('logic-master', 'Mestre da Lógica', 'Chegou ao Nível 3!');
    }
  }

  unlockAchievement(id, title, desc) {
    this.state.user.achievements.push(id);
    this.save();
    this.emit('achievementUnlocked', { id, title, desc });
  }

  addBadge(badgeId) {
    if (!this.state.user.badges.includes(badgeId)) {
      this.state.user.badges.push(badgeId);
      this.save();
      this.emit('badgeEarned', { badgeId });
    }
  }

  // --- Progress ---
  completeLesson(courseId, lessonId, xp = 50) {
    if (!this.state.progress.courses[courseId]) {
      this.state.progress.courses[courseId] = {};
    }

    if (!this.state.progress.courses[courseId][lessonId]) {
      this.state.progress.courses[courseId][lessonId] = {
        completed: true,
        xpEarned: xp,
        timestamp: new Date().toISOString()
      };
      this.state.progress.lastLesson = { courseId, lessonId };
      this.addXp(xp);
      this.save();
    }
  }

  isLessonCompleted(courseId, lessonId) {
    return !!(this.state.progress.courses[courseId] && this.state.progress.courses[courseId][lessonId]);
  }

  getCourseProgress(courseId, totalLessons) {
    const completedCount = Object.keys(this.state.progress.courses[courseId] || {}).length;
    return Math.floor((completedCount / totalLessons) * 100);
  }

  // --- Pub/Sub ---
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this.state));
  }

  emit(event, data) {
    const customEvent = new CustomEvent(`labtechai:${event}`, { detail: data });
    window.dispatchEvent(customEvent);
  }
}

// Global Export
window.stateManager = new StateManager();
