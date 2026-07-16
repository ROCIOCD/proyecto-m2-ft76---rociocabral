const express = require('express');
const router = express.Router();

// Importamos las funciones vacías que creamos en el paso anterior
const {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authorsController');

// Definimos las rutas y las conectamos con su función
router.get('/', getAuthors);           // GET a /authors
router.get('/:id', getAuthorById);     // GET a /authors/1
router.post('/', createAuthor);        // POST a /authors
router.put('/:id', updateAuthor);      // PUT a /authors/1
router.delete('/:id', deleteAuthor);   // DELETE a /authors/1

module.exports = router;