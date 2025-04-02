import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';

export default class Song extends Model {
  static initModel(sequelize) {
    this.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        artist: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        albumId: {
          type: DataTypes.INTEGER, // Foreign key for Album
          allowNull: true,
          references: {
            model: 'albums', // Table name for Album
            key: 'id',
          },
        },
        genreId: {
          type: DataTypes.UUID, // Match the UUID type of Genre's id
          allowNull: true,
          references: {
            model: 'genres', // Table name for Genre
            key: 'id',
          },
        },
        releaseDate: {
          type: DataTypes.DATE,
        },
        type: {
          type: DataTypes.ENUM('single', 'album'),
          allowNull: false,
        },
        filePath: {
          type: DataTypes.STRING,
        },
        artCoverPath: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.ENUM('pending', 'approved', 'rejected'),
          defaultValue: 'pending',
        },
        likes: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: 'Song',
      }
    );
  }
}