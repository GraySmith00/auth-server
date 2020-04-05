const Joi = require('@hapi/joi');

exports.getRegisterValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(data);
  return error;
};

exports.getLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(data);
  return error;
};
