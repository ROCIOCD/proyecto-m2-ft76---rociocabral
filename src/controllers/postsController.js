// Importamos la conexión a la base de datos
const pool = require('../config/db');

// Obtener todos los posts (GET)
const getPosts = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM posts');
    res.status(200).json(response.rows);
  } catch (error) {
    console.error('Error buscando posts:', error);
    res.status(500).json({ error: 'Hubo un problema al buscar los posts' });
  }
};

// Obtener un solo post por su ID (GET por ID)
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    
    if (response.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error('Error buscando post:', error);
    res.status(500).json({ error: 'Hubo un problema al buscar el post' });
  }
};

// Obtener todos los posts de un autor específico (La ruta especial de Henry)
const getPostsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const response = await pool.query('SELECT * FROM posts WHERE author_id = $1', [authorId]);
    
    // Acá simplemente devolvemos la lista. Si el autor no tiene posts, será un array vacío []
    res.status(200).json(response.rows);
  } catch (error) {
    console.error('Error buscando posts del autor:', error);
    res.status(500).json({ error: 'Hubo un problema al buscar los posts' });
  }
};

// Crear un nuevo post (POST)
const createPost = async (req, res) => {
  try {
    const { author_id, title, content, published } = req.body;

    // Validamos datos obligatorios
    if (!author_id || !title || !content) {
      return res.status(400).json({ error: 'Los campos author_id, title y content son obligatorios' });
    }

    const response = await pool.query(
      'INSERT INTO posts (author_id, title, content, published) VALUES ($1, $2, $3, $4) RETURNING *',
      [author_id, title, content, published || false] // Si no mandan 'published', por defecto es false
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    // El error 23503 en Postgres significa "Violación de Llave Foránea" (el autor no existe)
    if (error.code === '23503') {
      return res.status(400).json({ error: 'El author_id especificado no existe en la base de datos' });
    }
    console.error('Error creando post:', error);
    res.status(500).json({ error: 'Hubo un problema al crear el post' });
  }
};

// Actualizar un post existente (PUT)
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;

    // En los posts no permitimos cambiar el autor original, solo el título, contenido y estado
    if (!title || !content) {
      return res.status(400).json({ error: 'Los campos title y content son obligatorios' });
    }

    const response = await pool.query(
      'UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4 RETURNING *',
      [title, content, published, id]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado para actualizar' });
    }

    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error('Error actualizando post:', error);
    res.status(500).json({ error: 'Hubo un problema al actualizar el post' });
  }
};

// Eliminar un post (DELETE)
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);

    if (response.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado para eliminar' });
    }

    res.status(200).json({ message: 'Post eliminado con éxito' });
  } catch (error) {
    console.error('Error eliminando post:', error);
    res.status(500).json({ error: 'Hubo un problema al eliminar el post' });
  }
};

module.exports = {
  getPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost
};