import sequelize from './index.js';
import Section from '../models/Section.js';
import Song from '../models/Song.js';
import Artist from '../models/Artist.js';
import Mix from '../models/Mix.js';

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Sync all models
    await sequelize.sync({ force: true }); // Use `force: true` to drop and recreate tables
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();