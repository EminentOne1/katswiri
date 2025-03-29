import { DataTypes, Model } from 'sequelize';

class Admin extends Model {
  static initModel(sequelize) {
    this.init(
      {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        role: { type: DataTypes.ENUM('superadmin', 'moderator', 'editor'), defaultValue: 'moderator' },
        status: { type: DataTypes.ENUM('active', 'inactive', 'suspended'), defaultValue: 'active' },
        permissions: { type: DataTypes.JSON, allowNull: true, defaultValue: {} },
      },
      { sequelize, modelName: 'Admin' }
    );
  }
}

export default Admin;
