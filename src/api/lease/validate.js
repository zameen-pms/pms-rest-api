const Joi = require("joi");

const leaseValidation = Joi.object({
	from: Joi.date().required(),
	to: Joi.date().required(),
	tenants: Joi.array().items(Joi.string()),
	document: Joi.string(),
});

module.exports = leaseValidation;
