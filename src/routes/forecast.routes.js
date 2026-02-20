const express = require("express");
const router = express.Router();
const { generateForecast } = require("../controllers/forecast.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Only logged-in users can request forecasts
router.get("/", authMiddleware, generateForecast);

module.exports = router;
