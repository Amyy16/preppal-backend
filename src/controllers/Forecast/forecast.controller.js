const ForecastService = require("../../service/Forecast/forecast.service");

const ForecastController = {
  //for daily forecast generation, this will be called by the cron job scheduler
  async generateDailyForecasts(businessId) {
    try {
      if (!businessId) {
        console.warn("Skipped: businessId is missing");
        return;
      }
      const forecasts =
        await ForecastService.generateDailyForecasts(businessId);
      console.log(`Daily forecasts generated for business ${businessId}`);
      return forecasts;
    } catch (err) {
    console.error(`Failed to generate forecasts for business ${businessId}:`, err);
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
