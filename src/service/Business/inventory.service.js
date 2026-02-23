const InventoryRepository = require('../../db/inventory.db');

const InventoryService = {

  async addInventory(businessId, inventoryData) {
    try {
      return await InventoryRepository.createInventory({ businessId, ...inventoryData });
    } catch (error) {
      throw new Error('Error adding inventory: ' + error.message);
    }
  },

  async getInventoryForBusiness(businessId) {
    try {
      return await InventoryRepository.getInventoryByBusinessId(businessId);
    } catch (error) {
      throw new Error('Error fetching inventory: ' + error.message);
    }
  },

  async getInventoryById(id) {
    try {
      const inventory = await InventoryRepository.getInventoryById(id);
      if (!inventory) throw new Error('Inventory item not found');
      return inventory;
    } catch (error) {
      throw new Error('Error fetching inventory item: ' + error.message);
    }
  },

  async updateInventory(id, data) {
    try {
      return await InventoryRepository.updateInventory(id, data);
    } catch (error) {
      throw new Error('Error updating inventory: ' + error.message);
    }
  },

  async deleteInventory(id) {
    try {
      return await InventoryRepository.deleteInventory(id);
    } catch (error) {
      throw new Error('Error deleting inventory: ' + error.message);
    }
  }

};

module.exports = InventoryService;