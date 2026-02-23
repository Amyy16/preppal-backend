const DailySalesRepository = require('../../db/dailySales.db');

const DailySalesService = {

  async addSale(saleData) {
    try {
      return await DailySalesRepository.createSale(saleData);
    } catch (error) {
      throw new Error('Error adding sale: ' + error.message);
    }
  },

  async getAllSales() {
    try {
      return await DailySalesRepository.getAllSales();
    } catch (error) {
      throw new Error('Error fetching sales: ' + error.message);
    }
  },

  async getSaleById(id) {
    try {
      const sale = await DailySalesRepository.getSaleById(id);
      if (!sale) throw new Error('Sale not found');
      return sale;
    } catch (error) {
      throw new Error('Error fetching sale: ' + error.message);
    }
  },

  async getSalesByBusiness(businessId) {
    try {
      return await DailySalesRepository.getSalesByBusiness(businessId);
    } catch (error) {
      throw new Error('Error fetching sales by business: ' + error.message);
    }
  },

  async updateSale(id, data) {
    try {
      return await DailySalesRepository.updateSale(id, data);
    } catch (error) {
      throw new Error('Error updating sale: ' + error.message);
    }
  },

  async deleteSale(id) {
    try {
      return await DailySalesRepository.deleteSale(id);
    } catch (error) {
      throw new Error('Error deleting sale: ' + error.message);
    }
  }

};

module.exports = DailySalesService;