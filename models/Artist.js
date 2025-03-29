import { DataTypes, Model } from 'sequelize';

export default class Artist extends Model {
  static initModel(sequelize) {
    this.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING },
        bio: { type: DataTypes.TEXT },
        instagram: { type: DataTypes.STRING },
        twitter: { type: DataTypes.STRING },
      },
      { sequelize, modelName: 'artist' }
    );
  }
}
