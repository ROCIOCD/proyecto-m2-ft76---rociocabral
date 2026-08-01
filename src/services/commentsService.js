const pool = require('../config/db');

const commentsService = {
    getAllComments: async () => {
        const query = 'SELECT * FROM comments';
        const { rows } = await pool.query(query);
        return rows;
    },

    getCommentsByPost: async (postId) => {
        const query = 'SELECT * FROM comments WHERE post_id = $1';
        const { rows } = await pool.query(query, [postId]);
        return rows;
    },

    createComment: async (post_id, author_id, content) => {
        const query = `
            INSERT INTO comments (post_id, author_id, content) 
            VALUES ($1, $2, $3) 
            RETURNING *;
        `;
        const { rows } = await pool.query(query, [post_id, author_id, content]);
        return rows[0];
    }
};

module.exports = commentsService; 