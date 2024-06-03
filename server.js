require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const lat = 37.853;
  const lon = 15.287;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do clima' });
  }
});

app.get('/currency', async (req, res) => {
  const apiKey = process.env.EXCHANGERATE_API_KEY;
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados de câmbio' });
  }
});

app.get('/mapKey', (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  res.json({ apiKey });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
