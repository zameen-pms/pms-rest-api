const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
	street: String,
	city: String,
	state: String,
	zip: String,
	fromDate: String,
	toDate: String,
	leavingReason: String,
	landlordName: String,
	landlordContactInfo: String,
});

const employerSchema = new Schema({
	name: String,
	title: String,
	address: String,
	fromDate: String,
	toDate: String,
	monthlyIncome: Number,
});

const financeSchema = new Schema({
	name: String,
	amount: String,
});

const referenceSchema = new Schema({
	name: String,
	phoneNumber: String,
	relationship: String,
});

const questionSchema = new Schema({
	question: String,
	response: String,
	reason: String,
});

const memberSchema = new Schema({
	type: { type: String },
	name: String,
	dob: String,
	relationship: String,
});

const applicationSchema = new Schema(
	{
		property: {
			type: Schema.Types.ObjectId,
			ref: "Property",
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		personal: {
			firstName: String,
			lastName: String,
			dob: String,
			ssn: String,
			phoneNumber: String,
			email: String,
			driversLicense: String,
		},
		addresses: [addressSchema],
		employers: [employerSchema],
		finances: [financeSchema],
		references: [referenceSchema],
		questions: [questionSchema],
		members: [memberSchema],
		documents: [String],
		authorization: {
			backgroundCheck: String,
			creditCheck: String,
			referenceCheck: String,
			employerCheck: String,
		},
		signature: {
			name: { type: String, required: true },
			date: { type: String, required: true },
		},
		hasPaid: { type: Boolean, default: false },
		status: { type: String, default: "In-Progress" },
		token: String,
		adminMessage: String,
	},
	{
		timestamps: true,
	}
);

const Application = model("Application", applicationSchema);

module.exports = Application;
