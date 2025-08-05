const express = require("express");
const { login, register, me } = require("../controllers/auth");
const {
  registerValidate,
  loginValidate,
} = require("../Middleware/authValidate");
const AuthRouter = express.Router();

AuthRouter.route("/register").post(registerValidate, register);
AuthRouter.route("/login").post(loginValidate, login);
AuthRouter.route("/me").get(me);
module.exports = AuthRouter;
