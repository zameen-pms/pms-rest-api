const Joi = require("joi");

const applicationValidation = Joi.object({
	property: Joi.string().required(),
	user: Joi.string().required(),
	personal: Joi.object(),
	addresses: Joi.array().items(Joi.object()),
	employers: Joi.array().items(Joi.object()),
	finances: Joi.array().items(Joi.object()),
	references: Joi.array().items(Joi.object()),
	questions: Joi.array().items(Joi.object()),
	members: Joi.array().items(Joi.object()),
	documents: Joi.array().items(Joi.string()),
	authorization: Joi.object(),
	signature: Joi.object({
		name: Joi.string().required(),
		date: Joi.string().required(),
	}).required(),
	hasPaid: Joi.boolean(),
	status: Joi.string(),
	token: Joi.string(),
	string: Joi.string(),
});

module.exports = applicationValidation;
