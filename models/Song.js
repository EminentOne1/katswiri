import { DataTypes, Model } from "sequelize";

export default class Song extends Model {
  static initModel(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
      
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        artist: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "song",
        tableName: "songs",
        timestamps: true,
      }
    );
  }
}
