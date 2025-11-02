const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'usuarios_db',
  password: '1234', 
  port: 5432,  // O el puerto que viste en Properties
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error(' Error al conectar a la BD:', err.stack);
  }
  console.log(' Conexión exitosa a PostgreSQL');
  release();
});

module.exports = pool;