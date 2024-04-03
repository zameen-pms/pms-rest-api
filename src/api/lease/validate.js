const Joi = require("joi");

const leaseValidationSchema = Joi.object({
	unit: Joi.string().required(),
	tenants: Joi.array().items(Joi.string()),
	startDate: Joi.date().required(),
	endDate: Joi.date().required(),
	rent: Joi.number().required(),
	deposit: Joi.number().required(),
});

module.exports = leaseValidationSchema;
