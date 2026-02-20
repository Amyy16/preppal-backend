const express = require("express");
const router = express.Router();

const businessController = require("../controllers/business.controller");
const authMiddleware = require("../middleware/auth.middleware"); // ✅ folder is singular
const roleMiddleware = require("../middleware/role.middleware"); // ✅ folder is singular

// Only users with role "owner" can create a business
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["owner"]),
  businessController.createBusiness
);

module.exports = router;
