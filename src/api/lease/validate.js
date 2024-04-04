const Joi = require("joi");

const leaseValidationSchema = Joi.object({
	tenants: Joi.array().items(Joi.string()),
	startDate: Joi.date(),
	endDate: Joi.date(),
	rent: Joi.number(),
	deposit: Joi.number(),
});

module.exports = leaseValidationSchema;
