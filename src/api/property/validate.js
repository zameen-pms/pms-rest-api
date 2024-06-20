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
	availability: Joi.string().valid("Available", "Unavailable", "Occupied"),
	purchaseDate: Joi.date(),
	owner: Joi.string(),
	propertyData: Joi.string(),
	images: Joi.array(),
});

module.exports = propertyValidationSchema;
