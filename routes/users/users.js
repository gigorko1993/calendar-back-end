const express = require("express");
const router = express.Router();
const guard = require("../../helpers/guard");

const {
  registration,
  login,
  logout,
  current,
} = require("../../controllers/users");

router.post("/signup", registration);
router.post("/login", login);
router.post("/logout", guard, logout);
router.get("/current", guard, current);

module.exports = router;
