const DailyForecastRepository = require("../../db/dailyforecast.db");
const InventoryItem = require("../../models/inventory.model");
const ProductionPlan = require("../../models/productionplan.model");
const mlApiService = require("../MlApi/mlapi.service");

const ForecastService = {
  async generateDailyForecasts(businessId) {
    const items = await InventoryItem.findAll({
      where: { businessId: businessId },
    });
    if (items.length === 0) {
      console.log(
        "No inventory items found for business, skipping forecast generation.",
      );
      return;
    }

    const forecasts = [];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];

    for (const item of items) {
      try {
        // Validate business_type
        const businessType = ["Restaurant", "Cafe", "Bakery"].includes(
          item.productType,
        )
          ? item.productType
          : "Restaurant";

        if (Number(item.quantityAvailable) <= 0) {
          console.warn(`Skipping item ${item.id} due to invalid quantity`);
          continue; // skip invalid input
        }

        const payload = {
          item_name: item.productName,
          business_type: businessType,
          date: dateStr,
          price: Number(item.price),
          shelf_life_hours: Number(item.shelf),
          weather: "Clear",
          is_holiday: 0,
        };

        console.log(payload);

        const prediction = await mlApiService.getPrediction(payload);

        if (!prediction || prediction.fallback) {
          if (prediction && prediction.predicted_demand != null) {
            // ML returned cached forecast
            console.log(`Fallback cached forecast for item ${item.id}`);
          } else {
            // No cache, use yesterday's forecast
            console.log(
              `No cached forecast for item ${item.id}, checking yesterday's forecast`,
            );
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            const previousForecasts =
              await DailyForecastRepository.getForecastsByDate(
                yesterday.toISOString().split("T")[0],
                businessId,
              );

            const prev = previousForecasts.find((f) => f.itemId === item.id);

            if (prev) {
              prediction = {
                predicted_demand: prev.predictedDemand,
                recommended_quantity: prev.recommendedQuantity,
                confidence: prev.confidence,
                confidence_score: prev.confidenceScore,
                fallback: true,
                fallback_reason: "Using yesterday's forecast as backup",
              };
            } else {
              prediction = {
                predicted_demand: null,
                confidence: "Unknown",
                confidence_score: 0,
                fallback: true,
                fallback_reason:
                  "Model unavailable. No recent forecast available",
              };
            }
          }
        }

        // Save to DB only if predicted_demand exists
        if (prediction.predicted_demand != null) {
          const saved = await DailyForecastRepository.createForecast({
            itemId: item.id,
            businessId: businessId,
            forecastDate: tomorrow,
            predictedDemand: prediction.predicted_demand,
            recommendedQuantity: prediction.recommended_quantity || 0,
            confidence: prediction.confidence,
            confidenceScore: prediction.confidence_score || 0,
          });
          forecasts.push(saved);
        } else {
          // Still push fallback info to return to user
          forecasts.push({
            itemId: item.id,
            predictedDemand: null,
            recommendedQuantity: null,
            confidence: prediction.confidence,
            confidenceScore: prediction.confidence_score,
            fallback: true,
            fallback_reason: prediction.fallback_reason,
          });
        }
      } catch (err) {
        console.error(`Prediction failed for item ${item.id}`, err);

        // Last-resort fallback: yesterday's forecast
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const previousForecasts =
          await DailyForecastRepository.getForecastsByDate(
            yesterday.toISOString().split("T")[0],
            businessId,
          );
        const prev = previousForecasts.find((f) => f.itemId === item.id);

        forecasts.push(
          prev
            ? {
                itemId: item.id,
                predictedDemand: prev.predictedDemand,
                recommendedQuantity: prev.recommendedQuantity,
                confidence: prev.confidence,
                confidenceScore: prev.confidenceScore,
                fallback: true,
                fallback_reason: "ML error: using yesterday's forecast",
              }
            : {
                itemId: item.id,
                predictedDemand: null,
                recommendedQuantity: null,
                confidence: "Unknown",
                confidenceScore: 0,
                fallback: true,
                fallback_reason:
                  "ML error: no previous forecast available, please use historical sales as guide",
              },
        );

        continue;
      }
    }
    return forecasts;
  },

  async getTodayForecasts(businessId) {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Fetch forecasts within today's date range
    const forecasts = await DailyForecastRepository.getForecastsByDateRange(
      startOfDay,
      endOfDay,
      businessId,
    );
    console.log(startOfDay, endOfDay, forecasts);

    return forecasts.map((f) => ({
      itemId: f.itemId,
      itemName: f.InventoryItem?.productName,
      predictedDemand: f.predictedDemand,
      recommendedQuantity: f.recommendedQuantity,
      confidence: f.confidence,
      confidenceScore: f.confidenceScore,
      forecastDate: f.forecastDate,
    }));
  },

  async checkWasteRisk(businessId, itemId, plannedQuantity) {
    console.log("Checking risk for:", { businessId, itemId, plannedQuantity });
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const forecast = await DailyForecastRepository.getForecastByItemAndDate(
      startOfDay,
      endOfDay,
      businessId,
      itemId,
    );
    console.log("Today's forecast:", forecast);

    if (!forecast) {
      return {
        success: false,
        message:
          "No forecast available for this item today, cannot assess risk",
      };
    }
    const payload = {
      predicted_demand: forecast.predictedDemand,
      planned_quantity: plannedQuantity,
    };
    const riskData = await mlApiService.checkRisk(payload);

    if (!riskData) {
      return {
        success: false,
        message: "ML API unavailable",
      };
    }

    const saved = await ProductionPlan.create({
      businessId: businessId,
      itemId: itemId,
      predictedDemand: forecast.predictedDemand,
      planDate: today,
      plannedQuantity: plannedQuantity,
      riskLevel: riskData?.risk_level,
      wastePercentage: riskData?.waste_percentage,
    });

    return riskData;
  },
};

module.exports = ForecastService;
