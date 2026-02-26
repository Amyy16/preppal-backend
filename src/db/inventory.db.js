const Inventory = require('../models/inventory.model');

const InventoryRepository = {

  async createInventory(data) {
    try {
      const inventory = await Inventory.create(data);
      return this.mapToEntity(inventory);
    } catch (error) {
      throw new Error('Error creating inventory: ' + error.message);
    }
  },

  async getInventoryById(id) {
    try {
      const inventory = await Inventory.findByPk(id);
      return inventory ? this.mapToEntity(inventory) : null;
    } catch (error) {
      throw new Error('Error fetching inventory: ' + error.message);
    }
  },

  async getInventoryByBusinessId(businessId) {
    try {
      const items = await Inventory.findAll({ where: { businessId } });
      return items.map(this.mapToEntity);
    } catch (error) {
      throw new Error('Error fetching inventory for business: ' + error.message);
    }
  },

  async updateInventory(id, data) {
    try {
      await Inventory.update(data, { where: { id } });
      return this.getInventoryById(id);
    } catch (error) {
      throw new Error('Error updating inventory: ' + error.message);
    }
  },

  async deleteInventory(id) {
    try {
      await Inventory.destroy({ where: { id } });
      return true;
    } catch (error) {
      throw new Error('Error deleting inventory: ' + error.message);
    }
  },

  mapToEntity(item) {
    if (!item) return null;
    return {
      id: item.id,
      businessId: item.businessId,
      productName: item.productName,
      productType: item.productType ?? undefined,
      quantityAvailable: item.quantityAvailable,
      productionDate: item.productionDate ?? undefined,
      price: item.price,
      shelf: item.shelf,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

};

module.exports = InventoryRepository;