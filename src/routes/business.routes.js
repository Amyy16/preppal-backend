const express = require('express');
const router = express.Router();

const BusinessController = require('../controllers/Business/business.controller');
const authMiddleware = require('../middleware/auth.middleware');
const validateRequest = require('../middleware/validation');
const { businessSchema, updateBusinessSchema } = require('../validation/userValidation');


// Protect all routes
router.use(authMiddleware);

router.post('/create', validateRequest(businessSchema), BusinessController.addBusiness);           
router.get('/businesses', BusinessController.getBusinesses);          // Get all user's businesses
router.get('/:id', BusinessController.getBusinessById);     // Get single business by ID
router.put('/update/:id', validateRequest(updateBusinessSchema), BusinessController.updateBusiness);      // Update business
router.delete('/:id', BusinessController.deleteBusiness);   // Delete business

module.exports = router;

