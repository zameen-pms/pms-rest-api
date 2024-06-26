const { Schema, model } = require("mongoose");

const documentSchema = new Schema(
	{
		property: {
			type: Schema.Types.ObjectId,
			ref: "Property",
		},
		file: { type: String, required: true },
		type: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Document = model("Document", documentSchema);

module.exports = Document;
