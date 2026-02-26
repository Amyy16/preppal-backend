const ProductionPlan = require("../models/productionplan.model.js");
const { mapToEntity } = require("./dailyforecast.db.js");

const ProductionPlanRepository = {
  async createPlan(data) {
    try {
      const plan = await ProductionPlan.create(data);
      return plan;
    } catch (err) {
      throw new Error("Error saving production plan: " + err.message);
    }
  },

  mapToEntity(plan) {
    if (!plan) return null;
    return {
      id: plan.id,
      businessId: plan.businessId,
      itemId: plan.itemId,
      planDate: plan.planDate,
      predictedDemand: plan.predictedDemand,
      plannedQuantity: plan.plannedQuantity,
      riskLevel: plan.riskLevel,
      wastePercentage: plan.wastePercentage,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
    };
  },
};

module.exports = ProductionPlanRepository;
