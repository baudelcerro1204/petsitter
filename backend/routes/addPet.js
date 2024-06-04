const express = require('express');
const petController = require('../controllers/petController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/pets', authMiddleware, petController.addPets);

module.exports = router;
