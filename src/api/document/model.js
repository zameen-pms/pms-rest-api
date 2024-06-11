const { Schema, model } = require("mongoose");

const documentSchema = new Schema(
	{
		property: {
			type: Schema.Types.ObjectId,
			ref: "Property",
		},
		file: { type: String, required: true },
		type: { type: String, required: true },
		description: { type: String },
		parties: [
			{
				name: String,
				role: String,
			},
		],
	},
	{
		timestamps: true,
	}
);

const Document = model("Document", documentSchema);

module.exports = Document;
