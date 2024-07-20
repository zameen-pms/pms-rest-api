const { Schema, model } = require("mongoose");

const consultationSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		availability: { type: String, required: true },
		propertyCount: { type: String, required: true },
		comments: String,
	},
	{
		timestamps: true,
	}
);

const Consultation = model("Consultation", consultationSchema);

module.exports = Consultation;
