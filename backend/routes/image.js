const express = require('express');
const router = express.Router();
const { uploadImageName, getImageUrl } = require('../controllers/imageController');

router.post('/upload-image', uploadImageName);
router.get('/get-image-url/:imageName', getImageUrl);

module.exports = router;
