const Joi = require("joi");

const applicationValidation = Joi.object({
	user: Joi.string().required(),
	hasPaid: Joi.boolean(),
	signature: Joi.object({
		name: Joi.string().required(),
		date: Joi.string().required(),
	}).required(),
	applicant: Joi.object(),
	occupantA: Joi.object(),
	occupantB: Joi.object(),
	occupantC: Joi.object(),
	currentResidence: Joi.object(),
	previousResidence: Joi.object(),
	currentEmployer: Joi.object(),
	previousEmployer: Joi.object(),
	checkings: Joi.object(),
	savings: Joi.object(),
	creditCard: Joi.object(),
	autoLoan: Joi.object(),
	otherDebt: Joi.object(),
	reference: Joi.object(),
	otherReference: Joi.object(),
	lateOnRent: Joi.object(),
	partyToLawsuit: Joi.object(),
	doesSmoke: Joi.string(),
	hasPets: Joi.object(),
	reasonForMoving: Joi.string(),
	additionalComments: Joi.string(),
	questions: Joi.string(),
});

module.exports = applicationValidation;
