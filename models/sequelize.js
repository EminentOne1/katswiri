import { Sequelize } from 'sequelize';

// Initialize Sequelize instance
const sequelize = new Sequelize('katswiri', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log, // Enable logging to debug SQL queries
});

export default sequelize; // Export the Sequelize instance for use in other files;
