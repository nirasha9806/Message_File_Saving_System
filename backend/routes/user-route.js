const express = require("express");
const router = express.Router();

const {
  addUsers,
  getAllUsers,
  updateUserDetails,
} = require("../controllers/user-controller");

router.route("/addUsers").post(addUsers);
router.route("/userList").get(getAllUsers);
router.route("/updateUserDetails/:id").put(updateUserDetails);

module.exports = router;
