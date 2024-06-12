const express = require('express');
const serviceRequestController = require('../controllers/serviceRequestController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/request', authMiddleware, serviceRequestController.createRequest);
router.put('/request/:id/accept', authMiddleware, serviceRequestController.acceptRequest);
router.put('/request/:id/deny', authMiddleware, serviceRequestController.denyRequest);
router.get('/requests', authMiddleware, serviceRequestController.getUserRequests);
router.get('/provider/requests', authMiddleware, serviceRequestController.getProviderRequests);

module.exports = router;
