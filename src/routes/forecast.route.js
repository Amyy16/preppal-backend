const express = require('express');
const router = express.Router();

const ForecastController = require('../controllers/Forecast/forecast.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.post(
  '/generate-daily',
  ForecastController.generateDailyForecasts
);


router.get(
  '/today',
  authMiddleware,
  ForecastController.getTodayForecasts
);

module.exports = router;