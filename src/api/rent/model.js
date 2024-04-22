const { Schema, model } = require("mongoose");

const rentSchema = new Schema(
	{
		property: {
			type: Schema.Types.ObjectId,
			ref: "Property",
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		paymentStatus: {
			type: String,
			enum: ["On-Time", "Late"],
			default: "On-Time",
		},
		tenant: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		unit: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const Rent = model("Rent", rentSchema);

module.exports = {
	rentSchema,
	Rent,
};
