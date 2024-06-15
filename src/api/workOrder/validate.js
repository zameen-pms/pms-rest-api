const Joi = require("joi");

const workOrderValidation = Joi.object({
	property: Joi.string().required(),
	createdBy: Joi.string().required(),
	title: Joi.string().required(),
	description: Joi.string().required(),
	status: Joi.string().valid(
		"Created",
		"In-Progress",
		"Cancelled",
		"Completed"
	),
	comments: Joi.array(),
});

module.exports = workOrderValidation;
