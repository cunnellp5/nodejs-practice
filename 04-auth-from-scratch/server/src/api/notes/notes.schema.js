const Joi = require('@hapi/joi');

const schema = Joi.object({
  title: Joi.string().trim().max(100).required(),
  note: Joi.string().trim().required(),
});

module.exports = schema;
