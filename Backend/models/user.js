const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
require('dotenv').config()
const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Provide A UserName"],
      unique: true
    },
    email: {
      type: String,
      required: [true, "Please Provide An Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide A Password"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};  

const User = mongoose.model("user", UserSchema);

module.exports = User;
