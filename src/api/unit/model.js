const { Schema, model } = require("mongoose");

const unitSchema = new Schema(
	{
		number: { type: String, default: "1" },
		property: {
			type: Schema.Types.ObjectId,
			ref: "Property",
		},
		lease: { type: Schema.Types.ObjectId, ref: "Lease" },
		tenants: [{ type: Schema.Types.ObjectId, ref: "User" }],
		status: {
			type: String,
			enum: ["Available", "Unavailable", "Occupied"],
			default: "Available",
		},
	},
	{ timestamps: true }
);

const Unit = model("Unit", unitSchema);

module.exports = {
	unitSchema,
	Unit,
};
