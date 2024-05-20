const Joi = require("joi");

const workOrderValidationSchema = Joi.object({
	property: Joi.string().required(),
	title: Joi.string().required(),
	description: Joi.string().required(),
	status: Joi.string().valid(
		"Pending",
		"In-Progress",
		"Completed",
		"Cancelled"
	),
	completedAt: Joi.date(),
	assets: Joi.array().items(Joi.string()),
	comments: Joi.array().items(Joi.string()),
});

module.exports = workOrderValidationSchema;
