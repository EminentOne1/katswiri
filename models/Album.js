import { DataTypes, Model } from 'sequelize';

export default class Album extends Model {
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
          allowNull: true,
        },
        genreId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'genres',
            key: 'id',
          },
        },
        releaseDate: {
          type: DataTypes.DATE,
        },
        artCoverPath: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: 'Album',
      }
    );
  }
}
