const Joi = require("joi");

const rentValidationSchema = Joi.object({
	property: Joi.string().required(),
	amount: Joi.number().required(),
	date: Joi.date().required(),
	paymentStatus: Joi.string().valid("On-Time", "Late"),
	tenant: Joi.string(),
	unit: Joi.string(),
});

module.exports = rentValidationSchema;
