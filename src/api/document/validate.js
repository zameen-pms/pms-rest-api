const Joi = require("joi");

const documentValidation = Joi.object({
	property: Joi.string().required(),
	file: Joi.string().required(),
	type: Joi.string().required(),
});

module.exports = documentValidation;
