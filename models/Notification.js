import { DataTypes, Model } from 'sequelize';

export default class Notification extends Model {
  static initModel(sequelize) {
    this.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        message: { type: DataTypes.STRING, allowNull: false },
        type: {
          type: DataTypes.ENUM('song_approved', 'song_rejected', 'new_upload', 'admin_action'),
          allowNull: false,
        },
        userId: { type: DataTypes.UUID, allowNull: true },
        adminId: { type: DataTypes.UUID, allowNull: true },
        isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
      },
      { sequelize, modelName: 'notification' }
    );
  }
}
