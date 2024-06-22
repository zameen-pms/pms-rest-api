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
	availability: Joi.string().valid("Available", "Unavailable", "Occupied"),
	images: Joi.array(),
	general: Joi.object({
		beds: Joi.number(),
		baths: Joi.number(),
		sqft: Joi.number(),
		rent: Joi.number(),
		description: Joi.string(),
	}),
});

module.exports = propertyValidationSchema;
