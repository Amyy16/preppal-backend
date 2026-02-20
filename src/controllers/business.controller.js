const { Business } = require("../models");

exports.createBusiness = async (req, res) => {
  try {
    const { name, type, location } = req.body;

    const business = await Business.create({
      name,
      type,
      location,
      userId: req.user.id // from JWT
    });

    res.status(201).json({
      message: "Business created successfully",
      business
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
