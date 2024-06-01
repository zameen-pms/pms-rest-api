const { Schema, model } = require("mongoose");

const leaseSchema = new Schema(
	{
		from: {
			type: Date,
			required: true,
		},
		to: {
			type: Date,
			required: true,
		},
		tenants: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Lease = model("Lease", leaseSchema);

module.exports = Lease;
