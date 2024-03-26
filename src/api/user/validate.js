const Joi = require("joi");

const userValidationSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
	role: Joi.string().valid("admin", "manager", "owner", "tenant"),
	firstName: Joi.string(),
	lastName: Joi.string(),
	status: Joi.string().valid("Active", "Disabled"),
});

module.exports = userValidationSchema;
