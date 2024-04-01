const { Schema, model } = require("mongoose");

const propertySchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		location: {
			street: { type: String, required: true },
			city: { type: String, required: true },
			state: { type: String, required: true },
			zip: { type: String, required: true },
		},
		units: [{ type: Schema.Types.ObjectId, ref: "Unit" }],
		type: {
			type: String,
			enum: ["Single-Family", "Multi-Family"],
			default: "Single-Family",
		},
		manager: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

const Property = model("Property", propertySchema);

module.exports = {
	propertySchema,
	Property,
};
