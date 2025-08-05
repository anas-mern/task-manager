const { UnAuthenticated } = require("../errors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnAuthenticated("Un Authenticated Account");
  }
  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);
    if (!user) {
      throw new UnAuthenticated("User no longer exists");
    }

    req.user = payload;
    next();
  } catch (error) {
    throw new UnAuthenticated("Un Authenticated Account");
  }
};

module.exports = authMiddleware;
