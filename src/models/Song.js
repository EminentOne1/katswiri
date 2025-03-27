import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import Section from './Section.js';

const Song = sequelize.define('Song', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  plays: {
    type: DataTypes.STRING,
  },
  genre: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.ENUM('single', 'album'),
    allowNull: false,
  },
});

Section.hasMany(Song, { foreignKey: 'sectionId' });
Song.belongsTo(Section, { foreignKey: 'sectionId' });

export default Song;