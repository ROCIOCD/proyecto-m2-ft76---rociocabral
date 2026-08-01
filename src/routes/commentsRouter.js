const { Router } = require('express');
const commentsService = '../services/commentsService';

const router = Router();

// GET /comments - Listar todos los comentarios
router.get('/', async (req, res) => {
    try {
        const comments = await commentsService.getAllComments();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /comments/post/:postId - Listar comentarios de un post específico
router.get('/post/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await commentsService.getCommentsByPost(postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /comments - Crear un comentario
router.post('/', async (req, res) => {
    try {
        const { post_id, author_id, content } = req.body;
        
        // Validación obligatoria
        if (!post_id || !author_id || !content) {
            return res.status(400).json({ error: 'Faltan datos obligatorios (post_id, author_id, content)' });
        }

        const newComment = await commentsService.createComment(post_id, author_id, content);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
