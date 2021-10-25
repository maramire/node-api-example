const sequelize = require("../database/config");
const { DataTypes, Model } = require("sequelize");

class Post extends Model {}

Post.init(
  {
    caption: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize, // connection instance
    modelName: "post",
  }
);

module.exports = Post;
