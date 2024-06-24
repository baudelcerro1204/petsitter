const express = require('express');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, commentController.createComment);
router.get('/:serviceId', commentController.getCommentsByServiceId);
router.get('/user/:userId', authMiddleware, commentController.getCommentsByUserId);
router.get('/average-rating/:serviceId', commentController.getAverageRatingByServiceId);
router.get('/can-rate/:serviceId', authMiddleware, commentController.canRateService);
router.get('/has-contracted/:serviceId', authMiddleware, commentController.hasContractedService);

module.exports = router;
