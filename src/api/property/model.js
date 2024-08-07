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
		owners: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		currentLease: {
			type: Schema.Types.ObjectId,
			ref: "Lease",
		},
		availability: {
			type: String,
			enum: ["Available", "Unavailable", "Occupied"],
			default: "Available",
		},
		images: [
			{
				key: String,
				name: String,
				description: String,
			},
		],
		general: {
			beds: { type: Number, default: 0 },
			baths: { type: Number, default: 0 },
			sqft: { type: Number, default: 0 },
			rent: { type: Number, default: 0 },
			description: { type: String, default: "" },
		},
	},
	{ timestamps: true }
);

const Property = model("Property", propertySchema);

module.exports = {
	propertySchema,
	Property,
};
