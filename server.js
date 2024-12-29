import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'expenses_db'
});

// Endpoint for chart data
app.get('/api/data', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT centroCosto, SUM(monto) as totalMonto FROM gastos GROUP BY centroCosto'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoints for dropdown options
app.get('/api/centroCosto', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT DISTINCT centroCosto FROM gastos ORDER BY centroCosto'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/origenFondos', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT DISTINCT origenFondos FROM gastos ORDER BY origenFondos'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/lugarCompra', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT DISTINCT lugarCompra FROM gastos ORDER BY lugarCompra'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for saving new expenses
app.post('/api/gastos', async (req, res) => {
  try {
    const { centroCosto, origenFondos, monto, lugarCompra } = req.body;
    await pool.query(
      'INSERT INTO gastos (centroCosto, origenFondos, monto, lugarCompra) VALUES (?, ?, ?, ?)',
      [centroCosto, origenFondos, monto, lugarCompra]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});