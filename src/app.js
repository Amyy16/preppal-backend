const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes"); // Import auth routes
const businessRoutes = require("./routes/business.routes");
const forecastRoutes = require("./routes/forecast.routes");


const app = express();

// Security middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Logging
app.use(morgan("dev"));

// Body parser
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Food Waste Backend Running" });
});

// Authentication Routes
app.use("/api/v1/auth", authRoutes);

// Business Routes
app.use("/api/v1/business", businessRoutes);

app.use("/api/v1/forecast", forecastRoutes);


module.exports = app;
