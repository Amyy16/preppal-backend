const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {JWT_SECRET} = require('../_config/env.config')

async function generateVerificationToken() {
  // Generate a random number between 1000 and 9999
  const rawToken = Math.floor(1000 + Math.random() * 9000).toString();

  // Hash the number using SHA-256
  const hashToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  return { rawToken, hashToken };
};

async function generateAccessToken (user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role},
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

function verifyAccessToken(token) {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
};
  
module.exports = {generateVerificationToken, generateAccessToken, verifyAccessToken}
