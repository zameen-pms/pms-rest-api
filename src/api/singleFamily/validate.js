const Joi = require("joi");

const singleFamilyValidationSchema = Joi.object({
	address: Joi.object({
		street: Joi.string().required(),
		city: Joi.string().required(),
		state: Joi.string().required(),
		zip: Joi.string().required(),
	}).required(),
	manager: Joi.string(),
	lease: Joi.string(),
	availability: Joi.string().valid("Available", "Unavailable", "Occupied"),
	metaData: Joi.object(),
});

module.exports = singleFamilyValidationSchema;
