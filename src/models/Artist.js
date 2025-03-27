import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import Section from './Section.js';

const Artist = sequelize.define('Artist', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  instagram: {
    type: DataTypes.STRING,
  },
  twitter: {
    type: DataTypes.STRING,
  },
});

Section.hasMany(Artist, { foreignKey: 'sectionId' });
Artist.belongsTo(Section, { foreignKey: 'sectionId' });

export default Artist;