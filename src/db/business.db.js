const Business = require('../models/business.model');

const BusinessRepository = {

  async createBusiness(data) {
    try {
      const business = await Business.create(data);
      return business;
    } catch (error) {
      throw new Error('Error creating business: ' + error.message);
    }
  },


  async getBusinessById(id) {
    try {
      const business = await Business.findByPk(id);
      return business ? business : null;
    } catch (error) {
      throw new Error('Error fetching business by id: ' + error.message);
    }
  },

  async getBusinessesByUserId(userId) {
    try {
      const businesses = await Business.findAll({
        where: { userId }
      });
      return businesses;
    } catch (error) {
      throw new Error('Error fetching businesses by userId: ' + error.message);
    }
  },

  async getAllBusinesses() {
    try {
      const businesses = await Business.findAll({ attributes: ['id'] });
      return businesses;
    } catch (error) {
      throw new Error('Error fetching all businesses: ' + error.message);
    }
  },


  async updateBusiness(id, data) {
    try {
      await Business.update(data, { where: { id } });
      return await this.getBusinessById(id);
    } catch (error) {
      throw new Error('Error updating business: ' + error.message);
    }
  },


  async deleteBusiness(id) {
    try {
      await Business.destroy({ where: { id } });
      return true;
    } catch (error) {
      throw new Error('Error deleting business: ' + error.message);
    }
  }

};

module.exports = BusinessRepository;