const Joi = require("joi");

const leaseValidationSchema = Joi.object({
	unit: Joi.string().required(),
	tenant: Joi.string().required(),
	startDate: Joi.date().required(),
	endDate: Joi.date().required(),
	rent: Joi.number().required(),
	deposit: Joi.number().required(),
});

module.exports = leaseValidationSchema;
