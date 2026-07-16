// Importamos la conexión a la base de datos
const pool = require('../config/db');

// Obtener todos los autores (GET)
const getAuthors = async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM authors');
    res.status(200).json(response.rows);
  } catch (error) {
    console.error('Error buscando autores:', error);
    res.status(500).json({ error: 'Hubo un problema al buscar los autores' });
  }
};

// Obtener un solo autor por su ID (GET por ID)
const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params; 
    const response = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
    
    if (response.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error('Error buscando autor:', error);
    res.status(500).json({ error: 'Hubo un problema al buscar el autor' });
  }
};

// Crear un nuevo autor (POST)
const createAuthor = async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'El campo name es obligatorio' });
    }
    if (!email || email.trim() === '') {
      return res.status(400).json({ error: 'El campo email es obligatorio' });
    }

    const response = await pool.query(
      'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bio]
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Ese email ya está registrado en otro autor' });
    }
    console.error('Error creando autor:', error);
    res.status(500).json({ error: 'Hubo un problema al crear el autor' });
  }
};

// Actualizar un autor existente (PUT)
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, email, bio } = req.body; 

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'El campo name es obligatorio' });
    }
    if (!email || email.trim() === '') {
      return res.status(400).json({ error: 'El campo email es obligatorio' });
    }

    const response = await pool.query(
      'UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *',
      [name, email, bio, id]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado para actualizar' });
    }

    res.status(200).json(response.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Ese email ya está registrado en otro autor' });
    }
    console.error('Error actualizando autor:', error);
    res.status(500).json({ error: 'Hubo un problema al actualizar el autor' });
  }
};

// Eliminar un autor (DELETE)
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);

    if (response.rows.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado para eliminar' });
    }

    res.status(200).json({ message: 'Autor eliminado con éxito' });
  } catch (error) {
    console.error('Error eliminando autor:', error);
    res.status(500).json({ error: 'Hubo un problema al eliminar el autor' });
  }
};

// Exportamos todas las funciones
module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};