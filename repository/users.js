const { User } = require("../model/user");

const create = async (options) => {
  const user = new User(options);
  return await user.save(user);
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const findByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    console.log(`err`, err);
  }
};

module.exports = {
  create,
  updateToken,
  findByEmail,
};
