require("dotenv").config();
const app = require("./app");
const {authenticateDB} = require("./connection")
const {PORT} = require('./_config/env.config')

authenticateDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
