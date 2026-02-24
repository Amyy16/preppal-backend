const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const businessRoutes = require("./routes/business.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const dailySalesRoutes = require("./routes/dailySales.routes");
const forecastRoutes = require('./routes/forecast.route');

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/business", businessRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/daily-sales", dailySalesRoutes);
app.use('/api/v1/forecasts', forecastRoutes);

module.exports = app;
