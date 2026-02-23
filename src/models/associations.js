const User = require('./user');
const Business = require('./business');
const Inventory = require('./inventory');
const DailySales = require('./dailySales');
const VerificationToken = require('./verificationToken');

/*
USER RELATIONS
*/

// One User → Many Businesses
User.hasMany(Business, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Business.belongsTo(User, {
  foreignKey: 'userId'
});

// One User → One Verification Token
User.hasOne(VerificationToken, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
VerificationToken.belongsTo(User, {
  foreignKey: 'userId'
});


/*
BUSINESS RELATIONS
*/

// One Business → Many Inventory items
Business.hasMany(Inventory, {
  foreignKey: 'businessId',
  onDelete: 'CASCADE'
});
Inventory.belongsTo(Business, {
  foreignKey: 'businessId'
});

// One Business → Many Daily Sales
Business.hasMany(DailySales, {
  foreignKey: 'businessId',
  onDelete: 'CASCADE'
});
DailySales.belongsTo(Business, {
  foreignKey: 'businessId'
});

// INVENTORY RELATIONS


// One Inventory → Many Daily Sales
Inventory.hasMany(DailySales, {
  foreignKey: 'inventoryId',
  onDelete: 'CASCADE'
});
DailySales.belongsTo(Inventory, {
  foreignKey: 'inventoryId'
});

module.exports = {
  User,
  Business,
  Inventory,
  DailySales,
  VerificationToken
};