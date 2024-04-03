const Joi = require("joi");

const userValidationSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string(),
	role: Joi.string().valid("manager", "tenant"),
	firstName: Joi.string(),
	lastName: Joi.string(),
	status: Joi.string().valid("Active", "Disabled"),
});

module.exports = userValidationSchema;
