const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/Auth/auth.controller');
const validateRequest = require('../middleware/validation');
const { registerUserSchema, loginUserSchema, resetPasswordSchema, forgotPasswordSchema } = require('../validation/authValidation');

// Signup
router.post('/signup', validateRequest(registerUserSchema), AuthController.signup);

// Login
router.post('/login', validateRequest(loginUserSchema), AuthController.login);

// Verify Email
router.post('/verify-email', AuthController.verifyEmail);

// Resend Email Verification(controller will accepts email from the client)
router.post('/resend-verification', validateRequest(forgotPasswordSchema), AuthController.resendEmailVerification);

// Forgot Password
router.post('/forgot-password', validateRequest(forgotPasswordSchema), AuthController.forgotPassword);

// Reset Password
router.post('/reset-password', validateRequest(resetPasswordSchema), AuthController.resetPassword);

module.exports = router;