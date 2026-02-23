const express = require('express');
const router = express.Router();

const InventoryController = require('../controllers/Business/inventory.controller');
const authMiddleware = require('../middleware/auth.middleware');
const validateRequest = require('../middleware/validation');
const { updateInventorySchema, inventorySchema } = require('../validation/userValidation');

// Protect all inventory routes
router.use(authMiddleware);

router.post('/create', validateRequest(inventorySchema), InventoryController.addInventory);               // Add inventory
router.get('/business/:businessId', InventoryController.getInventoryForBusiness); // Get all inventory for a business
router.get('/:id', InventoryController.getInventoryById);         // Get single inventory item by ID
router.put('/:id', validateRequest(updateInventorySchema), InventoryController.updateInventory);          // Update inventory
router.delete('/:id', InventoryController.deleteInventory);       // Delete inventory

module.exports = router;