import { DataTypes, Model } from 'sequelize';

export default class SongMix extends Model {
  static initModel(sequelize) {
    this.init(
      {
        songId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'songs', key: 'id' },
          primaryKey: true,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE', // Ensure referential integrity
        },
        mixId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'mixes', key: 'id' },
          primaryKey: true,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE', 
        },
      },
      { sequelize, modelName: 'songMix', timestamps: true }
    );
  }
}
