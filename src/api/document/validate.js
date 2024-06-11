const Joi = require("joi");

const documentValidation = Joi.object({
	file: Joi.string().required(),
	type: Joi.string().required(),
	description: Joi.string(),
	parties: Joi.array(),
});

module.exports = documentValidation;
