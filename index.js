const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const characters = require('./characters.json');

// Endpoint: todos los personajes
app.get('/characters', (req, res) => {
  const { id, name } = req.query;
  let result = characters;

  if (id) result = result.filter(c => c.id == id);
  if (name) result = result.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));

  res.json(result);
});

// Endpoint: personaje por id
app.get('/characters/:id', (req, res) => {
  const character = characters.find(c => c.id == req.params.id);
  if (!character) return res.status(404).json({ message: 'Personaje no encontrado' });
  res.json(character);
});

app.listen(PORT, () => {
  console.log(`API de Star Wars corriendo en http://localhost:${PORT}`);
});
