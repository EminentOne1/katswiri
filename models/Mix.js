import { DataTypes, Model } from "sequelize";

export default class Mix extends Model {
  static initModel(sequelize) {
    this.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false, unique: true },
        genreId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: "genres", key: "id" }, // Ensure this matches the table name
          onDelete: "CASCADE",
          onUpdate: "CASCADE", // Add onUpdate to ensure referential integrity
        },
      },
      { sequelize, modelName: "mix" }
    );
  }
}
