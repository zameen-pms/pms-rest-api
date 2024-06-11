const Joi = require("joi");

const documentValidation = Joi.object({
	property: Joi.string().required(),
	file: Joi.string().required(),
	type: Joi.string().required(),
	description: Joi.string(),
});

module.exports = documentValidation;
