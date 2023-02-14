const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

class Users extends Model {}
Users.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Users",
  }
);

module.exports = Users;
