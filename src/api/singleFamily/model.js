const { Schema, model } = require("mongoose");

const singleFamilySchema = new Schema(
	{
		address: {
			street: { type: String, required: true },
			city: { type: String, required: true },
			state: { type: String, required: true },
			zip: { type: String, required: true },
		},
		manager: { type: Schema.Types.ObjectId, ref: "User" },
		lease: { type: Schema.Types.ObjectId, ref: "Lease" },
		availability: {
			type: String,
			enum: ["Available", "Unavailable", "Occupied"],
			default: "Available",
		},
		metaData: { type: Map, of: String },
	},
	{ timestamps: true }
);

const SingleFamily = model("SingleFamily", singleFamilySchema);

module.exports = {
	singleFamilySchema,
	SingleFamily,
};
