const axios = require("axios");
const User = require("../models/User");

const git = "https://api.github.com";

const addUser = async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await User.findOne({
      where: { username, is_deleted: false },
    });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "User already exists", data: existingUser });
    }
    const response = await axios.get(`${git}/users/${username}`);
    const {
      login,
      name,
      avatar_url,
      html_url,
      location,
      bio,
      blog,
      twitter_username,
      public_repos,
      public_gists,
      followers,
      following,
      created_at,
      updated_at,
    } = response.data;

    const user = await User.create({
      username: login,
      name,
      avatar_url,
      html_url,
      location,
      bio,
      blog,
      twitter_username,
      public_repos,
      public_gists,
      followers,
      following,
      created_at,
      updated_at,
    });
    res.status(201).json({ message: "User saved", data: user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching GitHub user", error: err.message });
  }
};

const findFriends = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username, is_deleted: false } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const followingRes = await axios.get(`${git}/users/${username}/following`);
    const followersRes = await axios.get(`${git}/users/${username}/followers`);

    const following = followingRes.data.map((f) => f.login);
    const followers = followersRes.data.map((f) => f.login);
    const friends = following.filter((user) => followers.includes(user));
    res.status(200).json({ username, friends });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error finding friends", error: err.message });
  }
};

const searchUsers = async (req, res) => {
  const { username, location } = req.query;

  try {
    const whereClause = { is_deleted: false };
    if (username) {
      whereClause.username = username;
    }
    if (location) {
      whereClause.location = location;
    }
    const users = await User.findAll({ where: whereClause });
    res.status(200).json({ users });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error searching users", error: err.message });
  }
};

module.exports = { addUser, findFriends, searchUsers };
