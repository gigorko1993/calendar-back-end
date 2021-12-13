const Tasks = require("../repository/tasks");
const { HttpCode } = require("../config/constants");

const createTask = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const task = await Transaction.addTask({
      ...req.body,
      owner: userId,
    });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { task },
    });
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await Tasks.listTasks(userId, req.query);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { ...data },
    });
  } catch (err) {
    console.log(err.message);
  }
};

const removeTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const task = await Tasks.deleteTask(req.params.ID, userId);
    if (task) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        message: "task deleted",
      });
    }
    return res.status(HttpCode.FORBIDDEN).json({
      status: "error",
      code: HttpCode.FORBIDDEN,
      message: "Not Found",
    });
  } catch (err) {
    console.log(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const task = await Tasks.updateTask(req.params.ID, req.body, userId);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { task },
      });
    }

    return res.status(HttpCode.FORBIDDEN).json({
      status: "error",
      code: HttpCode.FORBIDDEN,
      message: "Not Found",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  removeTask,
};
