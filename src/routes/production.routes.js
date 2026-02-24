const express = require('express');
const router = express.Router();

const ProductionController = require('../controllers/Forecast/production.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.post(
  '/check-risk',
  ProductionController.checkRisk, authMiddleware
);


module.exports = router;