const sequelize = require("../database/config");
const { DataTypes, Model } = require("sequelize");
const Post = require("./post");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // connection instance
    modelName: "User",
  }
);

User.hasMany(Post, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = User;
