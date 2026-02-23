const AuthService = require('../../service/Auth/auth.service');

const AuthController = {

  async signup(req, res) {
    try {
      const { email, username, password } = req.body;

      const user = await AuthService.signup({
        email,
        username,
        password,
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully. Please verify your email.",
        data: user,
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Signup failed",
      });
    }
  },


  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login({
        email,
        password,
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken: result,
      });

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message || "Invalid credentials",
      });
    }
  },

  async resendEmailVerification(req, res) {
    try {
      const { email } = req.body;
      await AuthService.resendVerification(email);

      return res.status(200).json({
        success: true,
        message: "Verification email resent successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to resend verification email",
      });
    }
  },

  async verifyEmail(req, res) {
    try {
      const { token } = req.body;

      await AuthService.verifyEmail( token);

      return res.status(200).json({
        success: true,
        message: "Email verified successfully",
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Email verification failed",
      });
    }
  },

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      await AuthService.forgotPassword(email);

      return res.status(200).json({
        success: true,
        message: "Password reset email sent successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to send password reset email",
      });
    }
  },

  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;

      await AuthService.resetPassword(token, newPassword);

      return res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to reset password",
      });
    }
  },

};

module.exports = AuthController;