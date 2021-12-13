const User = require("../model/user");

const create = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = {
  create,
  updateToken,
  findByEmail,
};
