const axios = require("axios");
require("dotenv").config();

const BASE_URL = process.env.ML_API_BASE_URL;
const TIMEOUT = 70000;

const mlApiService = {
  async healthCheck() {
    try {
      const res = await axios.get(`${BASE_URL}/api/health`, { timeout: 5000 });
      return res.status === 200 && res.data?.status === "healthy";
    } catch (err) {
      console.error("ML API health check failed:", err.message);
      return false;
    }
  },

  async getPrediction(payload) {
    try {
      const res = await axios.post(`${BASE_URL}/api/predict`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: TIMEOUT,
      });
      return res.status === 200 ? res.data : null;
    } catch (err) {
      console.error("ML API prediction failed:", err);
      return null;
    }
  },

  async checkRisk(payload) {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/risk-alert`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: TIMEOUT,
        },
      );
      return res.status === 200 ? res.data : null;
    } catch (err) {
      console.error("ML API risk check failed:", err.message);
      return null;
    }
  },
};

module.exports = mlApiService;
