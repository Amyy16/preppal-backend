const {Sequelize} = require('sequelize');
const config = require('./config/config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

//Authenticate with DB
const authenticateDB = async() => {
  try {
    await sequelize.authenticate(); 
    console.log('Connected to Database');
  } catch (error) {
    console.log('Connection to Database failed:', error);
    process.exit(1);
  };
};

module.exports = {sequelize, authenticateDB};