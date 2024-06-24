const express = require('express');
const { rateService, canRateService, hasContractedService, getUserRating, getAverageRating } = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/rate/:serviceId', authMiddleware, rateService);
router.get('/can-rate/:serviceId', authMiddleware, canRateService);
router.get('/has-contracted/:serviceId', authMiddleware, hasContractedService);
router.get('/user-rating/:serviceId', authMiddleware, getUserRating);
router.get('/average-rating/:serviceId', getAverageRating);

module.exports = router;
