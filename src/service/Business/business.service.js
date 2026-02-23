const BusinessRepository = require('../../db/business.db');

const BusinessService = {
  
  async addBusiness(userId, businessData) {
    try {
      return await BusinessRepository.createBusiness({ userId, ...businessData });
    } catch (error) {
      throw new Error('Error adding business: ' + error.message);
    }
  },

  async getUserBusinesses(userId) {
    try {
      return await BusinessRepository.getBusinessesByUserId(userId);
    } catch (error) {
      throw new Error('Error fetching businesses: ' + error.message);
    }
  },

  async getBusinessById(id) {
    try {
      const business = await BusinessRepository.getBusinessById(id);
      if (!business) throw new Error('Business not found');
      return business;
    } catch (error) {
      throw new Error('Error fetching business: ' + error.message);
    }
  },

  async updateBusiness(id, data) {
    try {
      const updated = await BusinessRepository.updateBusiness(id, data);
      return updated;
    } catch (error) {
      throw new Error('Error updating business: ' + error.message);
    }
  },

  async deleteBusiness(id) {
    try {
      return await BusinessRepository.deleteBusiness(id);
    } catch (error) {
      throw new Error('Error deleting business: ' + error.message);
    }
  }

};

module.exports = BusinessService;