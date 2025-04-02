import { DataTypes, Model } from 'sequelize';

export default class Genre extends Model {
  static initModel(sequelize) {
    this.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
      },
      { sequelize, modelName: 'Genre', tableName: 'genres' } // Ensure tableName is 'genres'
    );
  }
}
