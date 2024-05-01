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
		comments: [
			{
				createdBy: { type: String },
				createdAt: { type: Date, default: Date.now() },
				message: { type: String },
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
