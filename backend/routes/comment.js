const express = require('express');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/comments', authMiddleware, commentController.createComment);
router.get('/comments/:serviceId', commentController.getCommentsByServiceId);
router.get('/comments/user/:userId', authMiddleware, commentController.getCommentsByUserId);


module.exports = router;
