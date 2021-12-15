const Task = require("../model/tasks");

const listTasks = async (userId) => {
  const result = await Task.find(
    {
      owner: userId,
    },
    ["id", "start", "duration", "title"],
    {
      sort: {
        start: 1,
      },
    }
  );

  return result;
};

const addTask = async (body) => {
  const result = await Task.create(body);
  return result;
};

const deleteTask = async (taskId, userId) => {
  const result = await Task.findOneAndRemove({
    _id: taskId,
    owner: userId,
  });
  return result;
};

const updateTask = async (taskId, body, userId) => {
  const result = await Task.findOneAndUpdate(
    { _id: taskId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  listTasks,
  addTask,
  deleteTask,
  updateTask,
};
