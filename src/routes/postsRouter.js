const express = require('express');
const router = express.Router();

const {
  getPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postsController');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.get('/author/:authorId', getPostsByAuthor); // La ruta extra
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;