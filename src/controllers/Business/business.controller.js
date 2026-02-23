const BusinessService = require('../../service/Business/business.service');

const BusinessController = {

  async addBusiness(req, res) {
    try {
      const userId = req.user.id;
      const businessData = req.body;

      const business = await BusinessService.addBusiness(userId, businessData);

      return res.status(201).json({
        success: true,
        message: 'Business added successfully',
        data: business
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async getBusinesses(req, res) {
    try {
      const userId = req.user.id;
      
      const businesses = await BusinessService.getUserBusinesses(userId);

      return res.status(200).json({
        success: true,
        data: businesses
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async getBusinessById(req, res) {
    try {
      const { id } = req.params;

      const business = await BusinessService.getBusinessById(id);

      return res.status(200).json({
        success: true,
        data: business
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  },

  async updateBusiness(req, res) {
    try {
      const { id } = req.params;
      const businessData = req.body;

      const updatedBusiness = await BusinessService.updateBusiness(id, businessData);

      return res.status(200).json({
        success: true,
        message: 'Business updated successfully',
        data: updatedBusiness
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async deleteBusiness(req, res) {
    try {
      const { id } = req.params;

      await BusinessService.deleteBusiness(id);

      return res.status(200).json({
        success: true,
        message: 'Business deleted successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

};

module.exports = BusinessController;