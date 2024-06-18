const express = require('express');
const serviceController = require('../controllers/servicesController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/services', serviceController.getAllServices);
router.get('/services/:id', serviceController.getServiceById);
router.get('/provider/services', authMiddleware, serviceController.getServicesByProvider);
router.post('/services', authMiddleware, serviceController.createService);
router.put('/services/:id', authMiddleware, serviceController.updateService);
router.delete('/services/:id', authMiddleware, serviceController.deleteService);

module.exports = router;
