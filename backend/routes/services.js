const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

router.get('/walks', servicesController.getWalks);
router.get('/training', servicesController.getTraining);
router.get('/care', servicesController.getCare);
router.get('/walks/:id', servicesController.getWalkById);
router.get('/training/:id', servicesController.getTrainingById);
router.get('/care/:id', servicesController.getCareById);

module.exports = router;
