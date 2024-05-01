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
	comments: Joi.array().items(
		Joi.object({
			createdBy: Joi.string(),
			createdAt: Joi.date(),
			message: Joi.string(),
		})
	),
});

module.exports = workOrderValidationSchema;
