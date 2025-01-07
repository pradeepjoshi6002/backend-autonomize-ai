const axios = require("axios");
const User = require("../models/User");

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
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
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

module.exports = { addUser };
