const ForecastService = require("../../service/Forecast/forecast.service");

const ForecastController = {
  async generateDailyForecasts(req, res) {
    try {
      const { businessId } = req.query;
      if (!businessId) {
        return res.status(400).json({
          detail: {
            success: false,
            error: "Valid business_id is required",
          },
        });
      }
      const forecasts =
        await ForecastService.generateDailyForecasts(businessId);
      return res.status(200).json({
        success: true,
        message: "Daily forecasts generated successfully",
        data: forecasts,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to generate forecasts",
        data: null,
      });
    }
  },

  async getTodayForecasts(req, res) {
    try {
      const { businessId } = req.query;
      if (!businessId) {
        return res.status(400).json({
          detail: {
            success: false,
            error: "Valid businessId is required",
          },
        });
      }
      const forecasts = await ForecastService.getTodayForecasts(businessId);
      return res.status(200).json({
        success: true,
        message: "Today's forecasts fetched successfully",
        date: new Date().toISOString().split("T")[0],
        data: forecasts,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to fetch today's forecasts",
        data: null,
      });
    }
  },
};

module.exports = ForecastController;
