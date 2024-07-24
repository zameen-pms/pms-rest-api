const Joi = require("joi");

const propertyValidationSchema = Joi.object({
	address: Joi.object({
		street: Joi.string().required(),
		city: Joi.string().required(),
		state: Joi.string().required(),
		zip: Joi.string().required(),
	}).required(),
	type: Joi.string().valid(
		"Single-Family",
		"Duplex",
		"Multi-Family",
		"Apartment"
	),
	owners: Joi.array(),
	currentLease: Joi.string(),
	availability: Joi.string().valid("Available", "Unavailable", "Occupied"),
	images: Joi.array(),
	general: Joi.object(),
});

module.exports = propertyValidationSchema;
