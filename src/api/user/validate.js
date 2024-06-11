const Joi = require("joi");

const userValidationSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string(),
	role: Joi.string().valid("Manager", "Owner", "Tenant"),
	firstName: Joi.string(),
	lastName: Joi.string(),
	status: Joi.string().valid("Active", "Disabled"),
});

module.exports = userValidationSchema;
