import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import Section from './Section.js';

const Mix = sequelize.define('Mix', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Section.hasMany(Mix, { foreignKey: 'sectionId' });
Mix.belongsTo(Section, { foreignKey: 'sectionId' });

export default Mix;