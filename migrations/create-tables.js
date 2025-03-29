import sequelize from '../models/sequelize.js'; // Import sequelize instance
import '../models/index.js'; // Import models to ensure they are registered

async function runMigrations() {
  try {
    await sequelize.sync({ alter: true }); // Synchronize all tables
    console.log('Migrations executed successfully.');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await sequelize.close(); // Close the connection after migrations
  }
}

runMigrations();
