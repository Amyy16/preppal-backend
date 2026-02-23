require('dotenv').config(); // Load .env file

const PORT = process.env.PORT;

// Email Configuration
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const MAIL_PORT = Number(process.env.MAIL_PORT);
const MAIL_USER = process.env.MAIL_USER;


// Local Development
const JWT_SECRET = process.env.JWT_SECRET;


module.exports = {
  PORT,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_USER,
  JWT_SECRET,
};