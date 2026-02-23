const VerificationToken = require('../models/verificationToken.model');

const VerificationTokenRepository = {

  async createToken(data) {
    try {
      const token = await VerificationToken.create(data);
      return this.mapToEntity(token);
    } catch (error) {
      throw new Error('Error creating verification token: ' + error.message);
    }
  },

  async getTokenByUserId(userId) {
    try {
      const token = await VerificationToken.findOne({ where: { userId } });
      return token ? this.mapToEntity(token) : null;
    } catch (error) {
      throw new Error('Error fetching token: ' + error.message);
    }
  },

   async getTokenByHash(tokenHash) {
    try {
      const token = await VerificationToken.findOne({ where: { tokenHash } });
      return token ? this.mapToEntity(token) : null;
    } catch (error) {
      throw new Error('Error fetching token by hash: ' + error.message);
    }
  },

  async deleteToken(userId) {
    try {
      await VerificationToken.destroy({ where: { userId } });
    } catch (error) {
      throw new Error('Error deleting token: ' + error.message);
    }
  },

  mapToEntity(token) {
    if (!token) return null;
    return {
      id: token.id,
      userId: token.userId,
      tokenHash: token.tokenHash,
      expiresAt: token.expiresAt,
      createdAt: token.createdAt,
      updatedAt: token.updatedAt,
    };
  }
};

module.exports = VerificationTokenRepository;