const { Schema, model } = require("mongoose");

const applicationSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		hasPaid: {
			type: Boolean,
			default: false,
		},
		signature: {
			name: { type: String, required: true },
			date: { type: String, required: true },
		},
		applicant: {
			firstName: String,
			middleName: String,
			lastName: String,
			dob: String,
			ssn: String,
			email: String,
			cellPhone: String,
			homePhone: String,
			driversLicense: String,
		},
		occupantA: {
			name: String,
			dob: String,
			relation: String,
		},
		occupantB: {
			name: String,
			dob: String,
			relation: String,
		},
		occupantC: {
			name: String,
			dob: String,
			relation: String,
		},
		currentResidence: {
			address: String,
			city: String,
			state: String,
			zip: String,
			monthlyRent: Number,
			dates: String,
			movingReason: String,
			managerName: String,
			managerNumber: String,
		},
		previousResidence: {
			address: String,
			city: String,
			state: String,
			zip: String,
			monthlyRent: Number,
			dates: String,
			movingReason: String,
			managerName: String,
			managerNumber: String,
		},
		currentEmployer: {
			name: String,
			occupation: String,
			address: String,
			phone: String,
			dates: String,
			supervisorName: String,
			monthlyPay: Number,
		},
		previousEmployer: {
			name: String,
			occupation: String,
			address: String,
			phone: String,
			dates: String,
			supervisorName: String,
			monthlyPay: Number,
		},
		checkings: {
			bank: String,
			balance: Number,
		},
		savings: {
			bank: String,
			balance: Number,
		},
		creditCard: {
			bank: String,
			balance: Number,
		},
		autoLoan: {
			bank: String,
			balance: Number,
		},
		otherDebt: {
			bank: String,
			balance: Number,
		},
		reference: {
			name: String,
			number: String,
			relationship: String,
		},
		otherReference: {
			name: String,
			number: String,
			relationship: String,
		},
		lateOnRent: {
			response: String,
			reason: String,
		},
		partyToLawsuit: {
			response: String,
			reason: String,
		},
		doesSmoke: String,
		hasPets: {
			response: String,
			info: String,
		},
		reasonForMoving: String,
		additionalComments: String,
		questions: String,
	},
	{
		timestamps: true,
	}
);

const Application = model("Application", applicationSchema);

module.exports = Application;
