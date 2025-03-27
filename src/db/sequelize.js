import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('katswiri', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'mysql', });

export default sequelize;