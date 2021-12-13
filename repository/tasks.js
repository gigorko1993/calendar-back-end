const Task = require("../model/tasks");
const {
  CurrentMonth,
  CurrentYear,
  CurrentDay,
} = require("../config/constants");

const listTasks = async (
  userId,
  year = CurrentYear,
  month = CurrentMonth,
  day = CurrentDay
) => {
  const result = await Task.find({
    owner: userId,
    year: year,
    month: month,
    day: day,
  });

  return result;
};

const addTask = async (body) => {
  const result = await Task.create(body);
  return result;
};

const deleteTask = async (req, res, next) => {
  const result = await Task.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

const updateTask = async (contactId, body, userId) => {
  const result = await Task.findOneAndUpdate(
    { _id: contactId, owner: userId },
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
