const DailyForecast = require('../models/dailyforecast.model'); 

const DailyForecastRepository = {
  
  async createForecast(data) {
    try {
      const forecast = await DailyForecast.create(data);
      return this.mapToEntity(forecast);
    } catch (error) {
      throw new Error('Error creating daily forecast: ' + error.message);
    }
  },

  async getAllForecasts() {
    try {
      const forecasts = await DailyForecast.findAll();
      return forecasts.map(this.mapToEntity);
    } catch (error) {
      throw new Error('Error fetching all forecasts: ' + error.message);
    }
  },

  async getForecastById(id) {
    try {
      const forecast = await DailyForecast.findByPk(id);
      return forecast ? this.mapToEntity(forecast) : null;
    } catch (error) {
      throw new Error('Error fetching forecast by ID: ' + error.message);
    }
  },

  async getForecastsByBusiness(businessId) {
    try {
      const forecasts = await DailyForecast.findAll({ where: { businessId } });
      return forecasts.map(this.mapToEntity);
    } catch (error) {
      throw new Error('Error fetching forecasts by business: ' + error.message);
    }
  },

  async getForecastsByDate(date, businessId) {
    try {
      const forecasts = await DailyForecast.findAll({ 
        where: { 
          forecastDate: date,
          businessId: businessId
        } 
      });
      return forecasts.map(this.mapToEntity);
    } catch (error) {
      throw new Error('Error fetching forecasts by date: ' + error.message);
    }
  },

  async updateForecast(id, data) {
    try {
      await DailyForecast.update(data, { where: { id } });
      return await this.getForecastById(id);
    } catch (error) {
      throw new Error('Error updating daily forecast: ' + error.message);
    }
  },

  async deleteForecast(id) {
    try {
      await DailyForecast.destroy({ where: { id } });
      return true;
    } catch (error) {
      throw new Error('Error deleting daily forecast: ' + error.message);
    }
  },

  mapToEntity(forecast) {
    if (!forecast) return null;
    return {
      id: forecast.id,
      itemId: forecast.itemId,
      businessId: forecast.businessId,
      forecastDate: forecast.forecastDate,
      predictedDemand: forecast.predictedDemand,
      recommendedQuantity: forecast.recommendedQuantity,
      confidence: forecast.confidence,
      confidenceScore: forecast.confidenceScore,
      createdAt: forecast.createdAt,
      updatedAt: forecast.updatedAt,
    };
  }
};

module.exports = DailyForecastRepository;