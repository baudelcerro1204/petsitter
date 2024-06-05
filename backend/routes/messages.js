const express = require('express');
const { createMessage, getMessagesByUserId } = require('../controllers/messagesController');

const router = express.Router();

router.post('/messages', createMessage);
router.get('/messages/:userId', getMessagesByUserId);

module.exports = router;
