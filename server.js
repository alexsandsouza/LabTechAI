const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Datastore = require('nedb-promises');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const SECRET = 'labtechai_secret_123';

// Database Initialization
const usersDb = Datastore.create({ filename: './server/users.db', autoload: true });

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await usersDb.findOne({ email });
  if (existing) return res.status(400).json({ error: 'Usuário já existe' });

  const newUser = {
    name,
    email,
    password, // Em produção, usar bcrypt
    xp: 0,
    level: 1,
    achievements: [],
    progress: {},
    isPro: false,
    createdAt: new Date().toISOString()
  };

  const user = await usersDb.insert(newUser);
  const token = jwt.sign({ id: user._id }, SECRET);
  res.json({ token, user });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await usersDb.findOne({ email, password });
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = jwt.sign({ id: user._id }, SECRET);
  res.json({ token, user });
});

// --- USER & PROGRESS ROUTES ---
app.get('/api/user/profile', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send();

  try {
    const decoded = jwt.verify(token.split(' ')[1], SECRET);
    const user = await usersDb.findOne({ _id: decoded.id });
    res.json(user);
  } catch (e) {
    res.status(401).send();
  }
});

app.post('/api/user/sync', async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send();

  try {
    const decoded = jwt.verify(token.split(' ')[1], SECRET);
    const updates = req.body; // Expect xp, level, achievements, etc.
    await usersDb.update({ _id: decoded.id }, { $set: updates });
    res.json({ success: true });
  } catch (e) {
    res.status(500).send();
  }
});

// --- SOCIAL ROUTES ---
app.get('/api/ranking', async (req, res) => {
  // Get top 5 users by XP
  const users = await usersDb.find({}).sort({ xp: -1 }).limit(5);
  res.json(users.map(u => ({ name: u.name, xp: u.xp, level: u.level })));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 LabTechAI SaaS Backend em execução na porta ${PORT}`);
  console.log(`📂 Servindo arquivos de: ${path.join(__dirname, 'public')}`);
});
