const User = require('../models/user.model');

const UserRepository = {

  // CREATE
  async createUser(data) {
    try {
      const user = await User.create(data);
      return this.mapToEntity(user);
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  },

  // READ
  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user ? this.mapToEntity(user) : null;
    } catch (error) {
      throw new Error('Error fetching user by email: ' + error.message);
    }
  },

  async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user ? this.mapToEntity(user) : null;
    } catch (error) {
      throw new Error('Error fetching user by id: ' + error.message);
    }
  },

  async getUsersByRole(role) {
    try {
      const users = await User.findAll({ where: { role } });
      return users.map(this.mapToEntity);
    } catch (error) {
      throw new Error('Error fetching users by role: ' + error.message);
    }
  },

  async updateAccountStatus(id, status) {
    try {
      await User.update({ accountStatus: status }, { where: { id } });
    } catch (error) {
      throw new Error('Error updating account status: ' + error.message);
    }
  },

  async updatePassword(id, newPasswordHash) {
    try {
      const [updatedRows] = await User.update(
        { passwordHash: newPasswordHash },
        { where: { id } }
      );

      if (updatedRows === 0) {
        throw new Error('No user found or password not updated');
      }

      return true; // update successful
    } catch (error) {
      throw new Error('Error updating password: ' + error.message);
    }
},

  async markEmailVerified(id) {
    try {
      await User.update(
        { isEmailVerified: true, emailVerifiedAt: new Date() },
        { where: { id } }
      );
    } catch (error) {
      throw new Error('Error marking email verified: ' + error.message);
    }
  },

  // HELPER
  mapToEntity(user) {
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      passwordHash: user.passwordHash,
      role: user.role,
      accountStatus: user.accountStatus,
      isEmailVerified: user.isEmailVerified,
      emailVerifiedAt: user.emailVerifiedAt ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
};

module.exports = UserRepository;