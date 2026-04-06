/**
 * LabTechAI - Cliente de Autenticação SaaS
 */

class Auth {
  constructor() {
    this.token = localStorage.getItem('LABTECHAI_TOKEN');
    this.user = JSON.parse(localStorage.getItem('LABTECHAI_USER')) || null;
  }

  async register(name, email, password) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    this.saveSession(data.token, data.user);
    return data;
  }

  async login(email, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    this.saveSession(data.token, data.user);
    return data;
  }

  saveSession(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem('LABTECHAI_TOKEN', token);
    localStorage.setItem('LABTECHAI_USER', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('LABTECHAI_TOKEN');
    localStorage.removeItem('LABTECHAI_USER');
    window.location.href = 'index.html';
  }

  isLoggedIn() {
    return !!this.token;
  }
}

window.auth = new Auth();
