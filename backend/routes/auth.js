const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login-form', authController.getLoginForm);
router.post('/login', authController.login);
router.get('/register-form', authController.getRegisterForm);
router.post('/register', authController.register);

module.exports = router;
