/**
 * LabTechAI - Dashboard e Trilha de Aprendizagem
 * Renderiza o mapa gamificado de módulos e aulas.
 */

class Dashboard {
  constructor() {
    this.container = document.getElementById('dashboard-container');
    if (this.container) {
      this.init();
    }
  }

  init() {
    this.renderTrail();
    this.renderRanking();
    this.renderBadges();
    this.updateStats();
  }

  renderBadges() {
    const container = document.getElementById('badge-container');
    if (!container) return;

    // Mapping badge IDs to icons
    const badgeMap = {
      'first-step': { icon: 'fa-seedling', title: 'Primeiro Passo' },
      'logic-master': { icon: 'fa-brain', title: 'Mestre da Lógica' },
      'clean-code': { icon: 'fa-broom', title: 'Código Limpo' },
      'speed-coder': { icon: 'fa-bolt-lightning', title: 'Veloz' }
    };

    const achievements = stateManager.state.user.achievements || [];
    
    container.innerHTML = Object.entries(badgeMap).map(([id, info]) => `
      <div class="badge-slot ${achievements.includes(id) ? 'unlocked' : ''}" title="${info.title}">
        <i class="fa-solid ${info.icon}"></i>
      </div>
    `).join('');
  }

  calculateLevelTitle(level, xp) {
    const totalXp = xp + (level * 100);
    if (totalXp >= 1500) return 'Tech Lead 🚀';
    if (totalXp >= 701) return 'Dev Sênior 💎';
    if (totalXp >= 301) return 'Dev Pleno ⚡';
    if (totalXp >= 101) return 'Junior Dev 🔥';
    return 'Estagiário Dev 🌱';
  }

  updateStats() {
    const xpText = document.getElementById('xp-count');
    const levelText = document.getElementById('level-count');
    const levelTitle = document.getElementById('level-title');
    const progressBar = document.getElementById('xp-progress-bar');

    if (xpText) xpText.innerText = stateManager.state.user.xp;
    if (levelText) levelText.innerText = stateManager.state.user.level;
    if (levelTitle) levelTitle.innerText = this.calculateLevelTitle(stateManager.state.user.level, stateManager.state.user.xp);

    if (progressBar) {
      const percent = (stateManager.state.user.xp / stateManager.state.user.nextLevelXp) * 100;
      progressBar.style.width = `${percent}%`;
    }
  }

  async renderRanking() {
    const rankingList = document.getElementById('ranking-list');
    if (!rankingList) return;

    try {
      const res = await fetch('/api/ranking');
      const users = await res.json();

      rankingList.innerHTML = users.map((user, idx) => `
        <div class="ranking-item">
          <div class="ranking-pos">${idx + 1}</div>
          <div class="ranking-name">${user.name}</div>
          <div class="ranking-xp">${user.xp} XP</div>
        </div>
      `).join('');
    } catch (e) {
      console.warn("Failed to load real ranking, showing placeholders.");
    }
  }

  renderTrail() {
    const courseId = stateManager.state.currentCourse || 'logica-programacao';
    const course = COURSE_DATA[courseId];
    
    if (!course) return;

    this.container.innerHTML = `
      <section class="hero-section animate-fade">
        <h1 class="logo-text">${course.title}</h1>
        <p class="text-secondary">${course.description}</p>
        <div class="header-progress-bar-container glass">
           <div id="course-main-progress" class="bar-fill" style="width: 0%"></div>
        </div>
      </section>

      <div class="trail-map">
        ${course.modules.map((module, idx) => this.renderModule(module, idx)).join('')}
      </div>
    `;

    // Update overall course progress bar
    const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const progress = stateManager.getCourseProgress(courseId, totalLessons);
    setTimeout(() => {
      const bar = document.getElementById('course-main-progress');
      if (bar) bar.style.width = `${progress}%`;
    }, 100);
  }

  renderModule(module, idx) {
    // Basic unlock logic: first module is always unlocked. 
    // Subsequent ones unlock if the previous module's last lesson is completed.
    const courseId = 'logica-programacao'; 
    const isUnlocked = idx === 0 || this.checkModuleUnlocked(idx);

    return `
      <div class="module-group animate-fade" style="animation-delay: ${idx * 0.1}s">
        <h2 class="module-title">${module.title}</h2>
        <div class="lesson-nodes">
          ${module.lessons.map(lesson => this.renderLessonNode(lesson, isUnlocked)).join('')}
        </div>
      </div>
    `;
  }

  renderLessonNode(lesson, moduleUnlocked) {
    const isCompleted = stateManager.isLessonCompleted('logica-programacao', lesson.id);
    const lessonUrl = lesson.type === 'lesson' ? './pages/lesson.html' : './pages/exercise.html';
    
    return `
      <a href="${lessonUrl}?id=${lesson.id}" class="node-link" onclick="handleNavigation(event, '${lesson.id}')">
        <div class="node ${isCompleted ? 'completed' : ''} ${moduleUnlocked ? 'active' : 'locked'}" 
             title="${lesson.title}">
          <span class="node-icon">${lesson.type === 'lesson' ? '📚' : '⚡'}</span>
          <span class="node-title">${lesson.title}</span>
          ${isCompleted ? '<div class="check-badge">✓</div>' : ''}
        </div>
      </a>
    `;
  }

  checkModuleUnlocked(idx) {
    const course = COURSE_DATA['logica-programacao'];
    const prevModule = course.modules[idx - 1];
    if (!prevModule) return true;
    
    // Logic: check all lessons in previous module
    return prevModule.lessons.every(l => stateManager.isLessonCompleted('logica-programacao', l.id));
  }
}

// Global Export
window.dashboard = new Dashboard();

// Helper para links
function handleNavigation(e, lessonId) {
  // If locked, prevent navigation
  const node = e.currentTarget.querySelector('.node');
  if (node.classList.contains('locked')) {
    e.preventDefault();
    ui.showToast('Módulo bloqueado! Complete os anteriores primeiro.', 'warning');
  }
}
