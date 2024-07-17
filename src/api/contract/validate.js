const Joi = require("joi");

const contractValidation = Joi.object({
	title: Joi.string().required(),
	parties: Joi.array(),
	file: Joi.string(),
});

module.exports = contractValidation;
