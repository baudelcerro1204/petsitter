const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, userController.getUserInfo);
router.get('/me/service-requests', authMiddleware, userController.getUserServiceRequests);
router.get('/me/comments', authMiddleware, userController.getUserComments);
router.get('/provider/comments', authMiddleware, userController.getProviderComments);

module.exports = router;
