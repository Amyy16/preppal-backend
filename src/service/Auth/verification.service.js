const VerificationTokenRepository = require('../../db/verificationToken.db');
const { generateVerificationToken } = require('../../utils/verificationToken');
const crypto = require('crypto');

const VerificationTokenService = {

  async createTokenForUser(userId) {
    try {
      const { rawToken, hashToken } = await generateVerificationToken();
      const tokenData = await VerificationTokenRepository.createToken({
        userId,
        tokenHash: hashToken,
        expiresAt: new Date(Date.now() + 60 * 1000) // 60 sec expiry
      });
      return { token: rawToken, tokenData };
    } catch (error) {
      throw new Error('Error creating verification token: ' + error.message);
    }
  },

  async getTokenByUserId(userId) {
    try {
      return await VerificationTokenRepository.getTokenByUserId(userId);
    } catch (error) {
      throw new Error('Error fetching verification token: ' + error.message);
    }
  },

  async verifyToken(rawToken) {
    try {
      const hashInput = crypto.createHash('sha256').update(rawToken).digest('hex');
      const tokenRecord = await VerificationTokenRepository.getTokenByHash(hashInput);

      if (!tokenRecord) {
        throw new Error('Invalid or expired verification token');
      }

      // Check expiry
      if (new Date(tokenRecord.expiresAt) < new Date()) {
        await this.deleteToken(tokenRecord.userId);
        throw new Error('Verification token has expired');
      }

      return tokenRecord.userId; // Return userId for further processing (e.g., mark email verified)
    } catch (error) {
      throw new Error('Error verifying token: ' + error.message);
    }
  },


  async deleteToken(userId) {
    try {
      await VerificationTokenRepository.deleteToken(userId);
    } catch (error) {
      throw new Error('Error deleting verification token: ' + error.message);
    }
  }
};

module.exports = VerificationTokenService;