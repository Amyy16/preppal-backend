const ForecastService = require("../../service/Forecast/forecast.service");

const ProductionController = {
  async checkRisk(req, res) {
    const { businessId, itemId, plannedQuantity } = req.body;

    if (!businessId || !itemId || plannedQuantity == null) {
      return res.status(400).json({
        success: false,
        error: "businessId, itemId, and plannedQuantity are required",
      });
    }
    try {
      const risk = await ForecastService.checkRisk(
        businessId,
        itemId,
        plannedQuantity,
      );

      res.json({
        success: true,
        ...risk,
      });
    } catch (err) {
      console.error("Production risk controller error:", err);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
};

module.exports = ProductionController;
