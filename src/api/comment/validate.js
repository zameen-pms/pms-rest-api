const Joi = require("joi");

const commentValidationSchema = Joi.object({
	createdBy: Joi.string().required(),
	content: Joi.string().required(),
});

module.exports = commentValidationSchema;
