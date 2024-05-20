const { Schema, model } = require("mongoose");

const workOrderSchema = new Schema(
	{
		property: {
			type: Schema.Types.ObjectId,
			ref: "Property",
			required: true,
		},
		title: { type: String, required: true },
		description: { type: String, required: true },
		status: {
			type: String,
			enum: ["Pending", "In-Progress", "Completed", "Cancelled"],
			default: "Pending",
		},
		completedAt: { type: Date },
		assets: [{ type: String }],
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
	{ timestamps: true }
);

const WorkOrder = model("WorkOrder", workOrderSchema);

module.exports = {
	workOrderSchema,
	WorkOrder,
};
