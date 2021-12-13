const jwt = require("jsonwebtoken");
const Users = require("../repository/users");
const { HttpCode } = require("../config/constant");

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const registration = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      code: HttpCode.CONFLICT,
      message: "Email is already exist",
    });
  }
  try {
    const newUser = await Users.create({ password, email });

    return res.status(HttpCode.CREATED).json({
      status: "succes",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  const isValidUserPassword = await user?.isValidPassword(password);

  if (!user || !isValidUserPassword) {
    return res.status(HttpCode.UNAUTORIZED).json({
      status: "error",
      code: HttpCode.UNAUTORIZED,
      message: "Invalid credentials",
    });
  }
  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await Users.updateToken(id, token);

  return res.status(HttpCode.OK).json({
    status: "succes",
    code: HttpCode.OK,
    data: {
      token,
    },
  });
};

const logout = async (req, res, next) => {
  const id = req.user._id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json();
};

module.exports = {
  registration,
  login,
  logout,
};