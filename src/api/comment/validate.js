const Joi = require("joi");

const commentValidation = Joi.object({
	user: Joi.string().required(),
	text: Joi.string().required(),
});

module.exports = commentValidation;
