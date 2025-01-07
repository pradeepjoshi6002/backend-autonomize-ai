const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/", userController.addUser);
router.get("/:username/friends", userController.findFriends);
router.get("/search", userController.searchUsers);
router.delete("/:username", userController.softDeleteUser);
router.put("/:username", userController.updateUser);
router.get("/", userController.listUsers);

module.exports = router;
