const { verifyAccessToken } = require("../utils/verificationToken");

function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role
    };

    next();
  } catch (error) {
    console.error("AuthMiddleware error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authenticate;