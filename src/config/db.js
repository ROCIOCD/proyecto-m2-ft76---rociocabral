require('dotenv').config();
const { Pool } = require('pg');

// Creamos la conexión usando las variables de tu archivo .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Este evento solo avisa cuando PostgreSQL se conecta con éxito, pero NO apaga el servidor
pool.on('connect', () => {
  console.log('✅ ¡Conexión exitosa a PostgreSQL! 🐘');
});

// Capturamos posibles errores inesperados para que no tumben el servidor
pool.on('error', (err) => {
  console.error('❌ Error inesperado en el cliente de PostgreSQL', err);
});

module.exports = pool;