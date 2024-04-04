const { Schema, model } = require("mongoose");

const leaseSchema = new Schema(
	{
		tenants: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		startDate: { type: Date },
		endDate: { type: Date },
		rent: { type: Number },
		deposit: { type: Number },
	},
	{ timestamps: true }
);

const Lease = model("Lease", leaseSchema);

module.exports = {
	leaseSchema,
	Lease,
};
