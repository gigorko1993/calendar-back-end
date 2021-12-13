const User = require("../model/user");

const createUser = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateUserToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

module.exports = {
  createUser,
  updateUserToken,
};
