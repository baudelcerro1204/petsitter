const express = require('express');
const serviceRequestController = require('../controllers/serviceRequestController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/request', authMiddleware, serviceRequestController.createServiceRequest);
router.put('/request/:id/accept', authMiddleware, serviceRequestController.acceptServiceRequest);
router.put('/request/:id/deny', authMiddleware, serviceRequestController.denyServiceRequest);
router.get('/requests', authMiddleware, serviceRequestController.getUserServiceRequests);
router.get('/provider/requests', authMiddleware, serviceRequestController.getProviderServiceRequests);

module.exports = router;
