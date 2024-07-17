const { Schema, model } = require("mongoose");

const contractSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		parties: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		file: String,
	},
	{
		timestamps: true,
	}
);

const Contract = model("Contract", contractSchema);

module.exports = Contract;
