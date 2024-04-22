const { Schema, model } = require("mongoose");

const propertySchema = new Schema(
	{
		address: {
			street: { type: String, required: true },
			city: { type: String, required: true },
			state: { type: String, required: true },
			zip: { type: String, required: true },
		},
		type: {
			type: "String",
			enum: ["Single-Family", "Duplex", "Multi-Family", "Apartment"],
			default: "Single-Family",
		},
		availability: {
			type: String,
			enum: ["Available", "Unavailable", "Occupied"],
		},
		manager: { type: Schema.Types.ObjectId, ref: "User" },
		owner: { type: String },
		propertyData: { type: Schema.Types.ObjectId, ref: "PropertyData" },
	},
	{ timestamps: true }
);

const Property = model("Property", propertySchema);

module.exports = {
	propertySchema,
	Property,
};
