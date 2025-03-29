import { DataTypes, Model } from 'sequelize';

class User extends Model {
  static initModel(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User', 
        tableName: 'users',
        timestamps: true,
      }
    );
  }
}

export default User;
