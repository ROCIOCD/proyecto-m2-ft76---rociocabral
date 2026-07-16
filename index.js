require('dotenv').config();
const express = require('express');
const pool = require('./src/config/db');

// --- NUEVAS IMPORTACIONES PARA LA DOCUMENTACIÓN ---
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Importamos las rutas
const authorsRouter = require('./src/routes/authorsRouter');
const postsRouter = require('./src/routes/postsRouter');

const app = express();

// Middleware para que Express entienda formato JSON
app.use(express.json());

// --- RUTA PARA MOSTRAR LA DOCUMENTACIÓN ---
// Esto va a renderizar una página web hermosa con tus endpoints
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Le decimos a Express que use nuestras rutas
app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('¡Mi servidor Express está funcionando correctamente! 🚀');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación disponible en http://localhost:${PORT}/api-docs`);
});