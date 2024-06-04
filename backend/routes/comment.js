const express = require('express');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, commentController.createComment);
router.get('/:serviceId', commentController.getCommentsByServiceId);

module.exports = router;
