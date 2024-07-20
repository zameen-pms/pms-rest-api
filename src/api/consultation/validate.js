const Joi = require("joi");

const consultationValidation = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phoneNumber: Joi.string().required(),
	availability: Joi.string().required(),
	propertyCount: Joi.string().required(),
	comments: Joi.string(),
});

module.exports = consultationValidation;
