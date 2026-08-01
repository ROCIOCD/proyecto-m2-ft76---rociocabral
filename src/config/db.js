require('dotenv').config();
const { Pool } = require('pg');

// Creamos la conexión usando las variables de tu archivo .env o Railway
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Función para crear la tabla comments automáticamente si no existe
const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL,
        author_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('✅ Tabla "comments" verificada o creada con éxito.');
  } catch (error) {
    console.error('❌ Error al crear la tabla comments:', error);
  }
};

// Este evento avisa cuando PostgreSQL se conecta y dispara la creación de la tabla
pool.on('connect', () => {
  console.log('✅ ¡Conexión exitosa a PostgreSQL! 🐘');
  createTable();
});

// Capturamos posibles errores inesperados para que no tumben el servidor
pool.on('error', (err) => {
  console.error('❌ Error inesperado en el cliente de PostgreSQL', err);
});

module.exports = pool; 