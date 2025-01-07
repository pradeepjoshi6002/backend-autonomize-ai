const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, unique: true }, // GitHub login
  name: DataTypes.STRING,
  avatar_url: DataTypes.STRING, // GitHub avatar
  html_url: DataTypes.STRING, // GitHub profile URL
  location: DataTypes.STRING,
  bio: DataTypes.STRING,
  blog: DataTypes.STRING,
  twitter_username: DataTypes.STRING,
  public_repos: DataTypes.INTEGER,
  public_gists: DataTypes.INTEGER,
  followers: DataTypes.INTEGER,
  following: DataTypes.INTEGER,
  created_at: DataTypes.DATE, // Account creation date
  updated_at: DataTypes.DATE, // Last profile update
  is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = User;
