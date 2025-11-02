const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.json({ mensaje: '✅ API de Usuarios funcionando' });
});

// Probar conexión
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW(), current_database()');
    res.json({
      mensaje: '✅ Conexión a BD exitosa',
      base_datos: result.rows[0].current_database,
      hora_servidor: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Listar usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, correo, fecha_registro FROM usuarios ORDER BY id DESC'
    );
    res.json({
      total: result.rows.length,
      usuarios: result.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Registrar usuario
app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    
    if (!nombre || !correo || !contraseña) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    
    const existe = await pool.query('SELECT id FROM usuarios WHERE correo = $1', [correo]);
    if (existe.rows.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }
    
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, correo, contraseña) VALUES ($1, $2, $3) RETURNING id, nombre, correo, fecha_registro',
      [nombre, correo, contraseña]
    );
    
    res.status(201).json({
      mensaje: '✅ Usuario registrado exitosamente',
      usuario: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Endpoints disponibles:`);
  console.log(`   GET    /test-db`);
  console.log(`   GET    /usuarios`);
  console.log(`   POST   /usuarios`);
});