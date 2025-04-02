import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('katswiri', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log, 
});

export default sequelize; 
