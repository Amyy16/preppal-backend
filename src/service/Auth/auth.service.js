const UserRepository = require('../../db/user.db');
const VerificationTokenService = require('../Auth/verification.service');
const { generateAccessToken } = require('../../utils/verificationToken');
const Password = require('../../utils/passwordhash') 
const {sendVerificationEmail, sendPasswordResetEmail} = require('./email.service');
const crypto = require('crypto');
const VerificationTokenRepository = require('../../db/verificationToken.db');
const sendVerifymail = require('./mail.service');

const AuthService = {
  // Signup user
  async signup({ email, username, password }) {
    try {
      // hash password
      const passwordHash = await Password.hashPassword(password);

      // create user
      const user = await UserRepository.createUser({
        email,
        username,
        passwordHash,
      });

      // create email verification token
      const { token } = await VerificationTokenService.createTokenForUser(user.id)
      try {
        // await sendVerificationEmail(email, token);
        await sendVerifymail(user.email, token );
      } catch (error) {
        throw new Error('Error sending verification Email: ' + error);
      };

      const { passwordHash: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new Error('Error signing up: ' + error);
    }
  },

  // Login user
  async login({ email, password }) {
    try {
      const user = await UserRepository.getUserByEmail(email);
      if (!user) throw new Error('User not registered');

      const passwordMatch = await Password.comparePassword(password, user.passwordHash);
      if (!passwordMatch) throw new Error('Invalid credentials');

      const token = await generateAccessToken(user);

      return {
        token
      };
    } catch (error) {
      throw new Error('Error logging in: ' + error.message);
    }
  },

  // Verify user email
  async verifyEmail(rawToken) {
    try {
      const tokenRecord = await VerificationTokenService.verifyToken(rawToken); // returning userId

      // mark email verified
      await UserRepository.markEmailVerified(tokenRecord);

      //update account status
      await UserRepository.updateAccountStatus(tokenRecord, 'ACTIVE');
      // delete token
      await VerificationTokenService.deleteToken(tokenRecord);

      return true;
    } catch (error) {
      throw new Error('Error verifying email: ' + error.message);
    }
  },

//Resend verification email
async resendVerification(email) {
  try {
    // Get user by email
    const user = await UserRepository.getUserByEmail(email);
    if (!user) throw new Error("User not found");

    if (user.isEmailVerified) {
      throw new Error("Email is already verified");
    };

   //delete token before creating new one
     await VerificationTokenService.deleteToken(user.id);

    // Create a new verification token
    const { token } = await VerificationTokenService.createTokenForUser(user.id);

    // Send the email
    try {
      // await sendVerificationEmail(email, token);
      await sendVerifymail(user.email, token );

    } catch (error) {
      throw new Error('Error sending verification Email: ' + error.message);
    }

    return true;
  } catch (error) {
    throw new Error("Error resending verification email: " + error.message);
  }
},

    // Request password reset
  async forgotPassword(email) {
    try {
      const user = await UserRepository.getUserByEmail(email);
      if (!user) throw new Error('User not registered');
      
      await VerificationTokenService.deleteToken(user.id);

      const { token } = await VerificationTokenService.createTokenForUser(user.id);
      await sendPasswordResetEmail(email, token);

      return true;
    } catch (error) {
      throw new Error('Error sending password reset email: ' + error.message);
    }
  },

  // Reset password
  async resetPassword(rawToken, newPassword) {
    try {
      // Get the token record by token hash
      const hashedInput = crypto.createHash('sha256').update(rawToken).digest('hex');
      const tokenRecord = await VerificationTokenRepository.getTokenByHash(hashedInput);

      if (!tokenRecord) throw new Error('Invalid or expired token');

      // Hash the new password
      const passwordHash = await Password.hashPassword(newPassword);
      console.log(tokenRecord);
      
      // Update the user's password
      const updated = await UserRepository.updatePassword(tokenRecord.userId, passwordHash);
      console.log(tokenRecord);
      if (!updated) throw new Error('Password update failed');

      // Delete the token after successful reset
      await VerificationTokenService.deleteToken(tokenRecord.userId);

      return true;
    } catch (error) {
      throw new Error('Error resetting password: ' + error.message);
    }
  },
};

module.exports = AuthService;