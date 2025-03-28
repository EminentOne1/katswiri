import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const Section = sequelize.define('Section', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('songs', 'artists', 'mixes'),
    allowNull: false,
  },
});

export default Section;