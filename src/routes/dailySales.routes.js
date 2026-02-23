const express = require('express');
const router = express.Router();

const DailySalesController = require('../controllers/Business/dailySales.controller');
const authMiddleware = require('../middleware/auth.middleware');
const validateRequest = require('../middleware/validation');
const { dailySalesSchema, updateDailySalesSchema } = require('../validation/userValidation');

// Protect all routes
router.use(authMiddleware);

router.post('/create', validateRequest(dailySalesSchema), DailySalesController.addSale);                     // Add sale
router.get('sales/', DailySalesController.getAllSales);                  // Get all sales
router.get('/:id', DailySalesController.getSaleById);               // Get single sale by ID
router.get('/business/:businessId', DailySalesController.getSalesByBusiness); // Sales for a business
router.put('update/:id', validateRequest(updateDailySalesSchema), DailySalesController.updateSale);                // Update sale
router.delete('/:id', DailySalesController.deleteSale);             // Delete sale

module.exports = router;
