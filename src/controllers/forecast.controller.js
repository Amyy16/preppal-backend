const generateForecast = async (req, res) => {
  try {
    // Mock data for MVP (replace with real model later)
    const forecast = {
      date: new Date().toISOString().split("T")[0], // today's date
      items: [
        { name: "Burger", predicted: 50, confidence: 0.9 },
        { name: "Fries", predicted: 100, confidence: 0.85 },
      ],
    };
    res.json({ success: true, forecast });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Forecast generation failed" });
  }
};

module.exports = { generateForecast };
