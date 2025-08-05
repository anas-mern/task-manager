const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const { NotFound, BadRequest } = require("../errors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const sendSuccess = (res, data, status = StatusCodes.OK) =>
  res.status(status).json({ success: true, ...data });

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const isExist = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (isExist) {
    throw new BadRequest("UserName Or Email Are Already In Use");
  }
  const user = await User.create({ username, email, password });
  const token = user.createJWT();
  const { password: _, ...userData } = user.toObject();
  sendSuccess(res, { user: userData, token }, StatusCodes.CREATED);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("Email Is Not Found");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new BadRequest("Password Is Wrong");
  }
  const token = user.createJWT();
  sendSuccess(
    res,
    { user: { _id: user._id, username: user.username }, token },
    StatusCodes.CREATED
  );
};
const me = async (req, res) => {
  res.status(200).json({ user: req.user });
};
module.exports = {
  login,
  register,
  me,
};
