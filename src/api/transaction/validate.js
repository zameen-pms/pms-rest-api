const Joi = require("joi");

const transactionValidationSchema = Joi.object({
	type: Joi.string().valid("Income", "Expense").required(),
	amount: Joi.number().required(),
	description: Joi.string().required(),
});

module.exports = transactionValidationSchema;
