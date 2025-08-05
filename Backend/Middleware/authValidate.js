const joi = require("joi");
const { BadRequest } = require("../errors");

const registerValidate = (req, res, next) => {
  console.log(req.body)
  const schema = joi.object({
    username: joi.string().min(4).max(40).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(15).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  next();
};

const loginValidate = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(15).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  next();
};

module.exports = {
  registerValidate,
  loginValidate,
};
