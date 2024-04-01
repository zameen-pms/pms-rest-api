const Joi = require("joi");

const unitValidationSchema = Joi.object({
	number: Joi.string(),
	property: Joi.string().required(),
	lease: Joi.string(),
	tenants: Joi.array().items(Joi.string()),
	status: Joi.string().valid("Available", "Unavailable", "Occupied"),
});

module.exports = unitValidationSchema;
