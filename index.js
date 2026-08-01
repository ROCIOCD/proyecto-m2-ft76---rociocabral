require('dotenv').config();
const express = require('express');
const pool = require('./src/config/db');

// --- NUEVAS IMPORTACIONES PARA LA DOCUMENTACIÓN ---
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Importamos las rutas
const authorsRouter = require('./src/routes/authorsRouter');
const postsRouter = require('./src/routes/postsRouter');
const commentsRouter = require('./src/routes/commentsRouter'); // <--- 1. IMPORTAMOS EL ROUTER DE COMMENTS

const app = express();

// Middleware para que Express entienda formato JSON
app.use(express.json());

// --- RUTA PARA MOSTRAR LA DOCUMENTACIÓN ---
// Esto va a renderizar una página web hermosa con tus endpoints
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Le decimos a Express que use nuestras rutas
app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter); // <--- 2. MONTAMOS EL ROUTER EN LA RUTA /comments

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('¡Mi servidor Express está funcionando correctamente! 🚀');
});

const PORT = process.env.PORT || 3000;

// --- FUNCIÓN PARA CREAR LA TABLA AUTOMÁTICAMENTE ---
const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                post_id INTEGER NOT NULL,
                author_id INTEGER NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Tabla "comments" verificada o creada correctamente.');
    } catch (error) {
        console.error('❌ Error al inicializar la tabla:', error);
    }
};

// --- INICIALIZAMOS LA BD Y LUEGO LEVANTAMOS EL SERVIDOR ---
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
        console.log(`📚 Documentación disponible en /api-docs`);
    });
});