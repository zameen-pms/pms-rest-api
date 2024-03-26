const Joi = require("joi");

const propertyValidationSchema = Joi.object({
	name: Joi.string().required(),
	location: Joi.object({
		street: Joi.string().required(),
		city: Joi.string().required(),
		state: Joi.string().required(),
		zip: Joi.string().required(),
	}).required(),
	units: Joi.array().items(Joi.string()),
	type: Joi.string().valid("Single-Family", "Multi-Family"),
});

module.exports = propertyValidationSchema;
