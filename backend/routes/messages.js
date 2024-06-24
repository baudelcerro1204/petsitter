const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const messagesController = require('../controllers/messagesController');

router.post('/messages', authMiddleware, messagesController.createMessage);
router.get('/supplier/message', authMiddleware, messagesController.getMessagesByProviderId);

module.exports = router;
