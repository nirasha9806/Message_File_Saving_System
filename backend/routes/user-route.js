const express = require("express");
const router = express.Router();

const {
  addUsers,
  getAllUsers,
} = require("../controllers/user-controller");

router.route("/addUsers").post(addUsers);
router.route("/userList").get(getAllUsers);

module.exports = router;
