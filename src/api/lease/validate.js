const Joi = require("joi");

const leaseValidation = Joi.object({
	property: Joi.string().required(),
	contract: Joi.string(),
	tenants: Joi.array(),
	startDate: Joi.date().required(),
	endDate: Joi.date().required(),
	rent: Joi.number(),
	rentDate: Joi.date(),
	// history: Joi.array(),
	// paymentHistory: Joi.array(),
});

module.exports = leaseValidation;
