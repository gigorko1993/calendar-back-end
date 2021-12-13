const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  removeTask,
} = require("../../controllers/tasks");

const quard = require("../../helpers/guard");

router.get("/", quard, getTasks);
router.post("/create", quard, createTask);
router.put("/:ID", quard, updateTask);
router.delete("/:ID", quard, removeTask);
module.exports = router;
