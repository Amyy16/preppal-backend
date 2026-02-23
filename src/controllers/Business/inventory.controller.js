const InventoryService = require('../../service/Business/inventory.service');

const InventoryController = {

  async addInventory(req, res) {
    try {
      const { businessId, ...inventoryData } = req.body;
      const inventory = await InventoryService.addInventory(businessId, inventoryData);

      return res.status(201).json({
        success: true,
        message: 'Inventory added successfully',
        data: inventory
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async getInventoryForBusiness(req, res) {
    try {
      const { businessId } = req.params;
      const items = await InventoryService.getInventoryForBusiness(businessId);

      return res.status(200).json({
        success: true,
        data: items
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async getInventoryById(req, res) {
    try {
      const { id } = req.params;
      const item = await InventoryService.getInventoryById(id);

      return res.status(200).json({
        success: true,
        data: item
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  },

  async updateInventory(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedItem = await InventoryService.updateInventory(id, data);

      return res.status(200).json({
        success: true,
        message: 'Inventory updated successfully',
        data: updatedItem
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  async deleteInventory(req, res) {
    try {
      const { id } = req.params;
      await InventoryService.deleteInventory(id);

      return res.status(200).json({
        success: true,
        message: 'Inventory deleted successfully'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

};

module.exports = InventoryController;