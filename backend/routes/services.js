const express = require('express');
const serviceController = require('../controllers/servicesController');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/services', serviceController.getAllServices);
router.get('/services/:serviceType', serviceController.getServicesByType);
router.get('/service/:id', serviceController.getServiceById);
router.get('/provider/services', authMiddleware, serviceController.getServicesByProvider);

router.post('/services', authMiddleware, upload.single('image'), serviceController.createService);
router.put('/services/:id', authMiddleware, upload.single('image'), serviceController.updateService);
router.delete('/services/:id', authMiddleware, serviceController.deleteService);

module.exports = router;
