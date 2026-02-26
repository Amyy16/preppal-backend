const cron = require("node-cron");
const {
  generateDailyForecasts,
} = require("../controllers/Forecast/forecast.controller");
const BusinessRepository = require("../db/business.db");

// Schedule: every day at 6 AM
cron.schedule(
  "0 6 * * *",
  async () => {
    try {
      console.log("Running daily forecast generation at 6 AM");

      // Fetch all businesses
      const businesses = await BusinessRepository.getAllBusinesses();

      if (businesses.length === 0) {
        console.log("No businesses found, skipping forecast generation.");
        return;
      }

      for (const business of businesses) {
        await generateDailyForecasts(business.id);
      }

      console.log(
        `Daily forecasts generated for ${businesses.length} businesses`,
      );
    } catch (error) {
      console.error("Error generating daily forecasts:", error);
    }
  },
  {
    timezone: "Africa/Lagos",
  },
);
