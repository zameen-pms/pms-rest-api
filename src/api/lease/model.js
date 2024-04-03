const { Schema, model } = require("mongoose");

const leaseSchema = new Schema(
	{
		unit: { type: Schema.Types.ObjectId, ref: "Unit" },
		tenants: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		rent: { type: Number, required: true },
		deposit: { type: Number, required: true },
	},
	{ timestamps: true }
);

const Lease = model("Lease", leaseSchema);

module.exports = {
	leaseSchema,
	Lease,
};
