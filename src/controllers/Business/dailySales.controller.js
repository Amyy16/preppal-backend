const DailySalesService = require('../../service/Business/dailySales.service');

const DailySalesController = {

  async addSale(req, res) {
    try {
      const saleData = req.body;
      const sale = await DailySalesService.addSale(saleData);

      return res.status(201).json({
        success: true,
        message: 'Sale recorded successfully',
        data: sale
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async getAllSales(req, res) {
    try {
      const sales = await DailySalesService.getAllSales();
      return res.status(200).json({
        success: true,
        data: sales
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async getSaleById(req, res) {
    try {
      const { id } = req.params;
      const sale = await DailySalesService.getSaleById(id);

      return res.status(200).json({
        success: true,
        data: sale
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  },

  async getSalesByBusiness(req, res) {
    try {
      const { businessId } = req.params;
      const sales = await DailySalesService.getSalesByBusiness(businessId);

      return res.status(200).json({
        success: true,
        data: sales
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async updateSale(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedSale = await DailySalesService.updateSale(id, data);

      return res.status(200).json({
        success: true,
        message: 'Sale updated successfully',
        data: updatedSale
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async deleteSale(req, res) {
    try {
      const { id } = req.params;
      await DailySalesService.deleteSale(id);

      return res.status(200).json({
        success: true,
        message: 'Sale deleted successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

};

module.exports = DailySalesController;