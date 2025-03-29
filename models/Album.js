import { DataTypes, Model } from 'sequelize';

export default class Album extends Model {
  static initModel(sequelize) {
    this.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        coverImage: { type: DataTypes.STRING },
        artistId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'artists', key: 'id' },
          onDelete: 'CASCADE',
        },
      },
      { sequelize, modelName: 'album' }
    );
  }
}
