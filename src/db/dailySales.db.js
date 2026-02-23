const DailySales = require('../models/dailySales.model.js');

const DailySalesRepository = {

  async createSale(data) {
    try {
      const sale = await DailySales.create(data);
      return this.mapToEntity(sale);
    } catch (error) {
      throw new Error('Error creating daily sale: ' + error.message);
    }
  },

  async getAllSales() {
    try {
      const sales = await DailySales.findAll();
      return sales.map(this.mapToEntity);
    } catch (error) {
      throw new Error('Error fetching all sales: ' + error.message);
    }
  },

  async getSaleById(id) {
    try {
      const sale = await DailySales.findByPk(id);
      return sale ? this.mapToEntity(sale) : null;
    } catch (error) {
      throw new Error('Error fetching sale by ID: ' + error.message);
    }
  },

  async getSalesByBusiness(businessId) {
    try {
      const sales = await DailySales.findAll({ where: { businessId } });
      return sales.map(this.mapToEntity);
    } catch (error) {
      throw new Error('Error fetching sales by business: ' + error.message);
    }
  },

  async updateSale(id, data) {
    try {
      await DailySales.update(data, { where: { id } });
      return await this.getSaleById(id);
    } catch (error) {
      throw new Error('Error updating daily sale: ' + error.message);
    }
  },

  async deleteSale(id) {
    try {
      await DailySales.destroy({ where: { id } });
      return true;
    } catch (error) {
      throw new Error('Error deleting daily sale: ' + error.message);
    }
  },

  mapToEntity(sale) {
    if (!sale) return null;
    return {
      id: sale.id,
      businessId: sale.businessId,
      productId: sale.productId,
      quantitySold: sale.quantitySold,
      totalPrice: sale.totalPrice,
      saleDate: sale.saleDate,
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
    };
  }

};

module.exports = DailySalesRepository;