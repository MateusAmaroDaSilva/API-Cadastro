const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      const initial = { usuarios: [] };
      await fs.writeFile(DB_PATH, JSON.stringify(initial, null, 2));
      return initial;
    }
    throw err;
  }
}
async function writeDB(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}

function validateUser({ nome, email, telefone }) {
    const errors = {};
    if (!nome || !nome.trim()) errors.nome = 'Nome é obrigatório';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(String(email).trim())) {
      errors.email = 'Email inválido';
    }
    const tel = String(telefone ?? '').trim();
    if (!tel) errors.telefone = 'Telefone é obrigatório';
    else if (tel.replace(/\D/g, '').length < 8) errors.telefone = 'Telefone muito curto';
  
    return { valid: Object.keys(errors).length === 0, errors };
  }
  

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API Usuarios v1' });
});

app.get('/usuarios', async (req, res) => {
  const db = await readDB();
  res.json(db.usuarios);
});

app.get('/usuarios/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const db = await readDB();
  const user = db.usuarios.find(u => u.id === id);
  if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });
  res.json(user);
});

app.post('/usuarios', async (req, res) => {
  const { nome, email, telefone } = req.body;
  const { valid, errors } = validateUser({ nome, email, telefone });
  if (!valid) return res.status(400).json({ erros: errors });

  const db = await readDB();
  if (db.usuarios.some(u => u.email.toLowerCase() === String(email).toLowerCase())) {
    return res.status(409).json({ erro: 'Email já cadastrado' });
  }
  const nextId = db.usuarios.length ? Math.max(...db.usuarios.map(u => u.id)) + 1 : 1;
  const novo = { id: nextId, nome: nome.trim(), email: String(email).trim(), telefone: String(telefone).trim() };
  db.usuarios.push(novo);
  await writeDB(db);
  res.status(201).json(novo);
});

app.put('/usuarios/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nome, email, telefone } = req.body;
  const { valid, errors } = validateUser({ nome, email, telefone });
  if (!valid) return res.status(400).json({ erros: errors });

  const db = await readDB();
  const idx = db.usuarios.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ erro: 'Usuário não encontrado' });

  if (db.usuarios.some(u => u.email.toLowerCase() === String(email).toLowerCase() && u.id !== id)) {
    return res.status(409).json({ erro: 'Email já cadastrado em outro usuário' });
  }

  db.usuarios[idx] = { id, nome: nome.trim(), email: String(email).trim(), telefone: String(telefone).trim() };
  await writeDB(db);
  res.json(db.usuarios[idx]);
});

app.delete('/usuarios/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const db = await readDB();
  const before = db.usuarios.length;
  db.usuarios = db.usuarios.filter(u => u.id !== id);
  if (db.usuarios.length === before) return res.status(404).json({ erro: 'Usuário não encontrado' });
  await writeDB(db);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`✅ API rodando em http://localhost:${PORT}`));

