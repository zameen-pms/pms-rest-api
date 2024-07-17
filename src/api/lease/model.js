const { Schema, model } = require("mongoose");

const leaseSchema = new Schema(
	{
		property: {
			type: Schema.Types.ObjectId,
			ref: "Property",
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		contract: {
			type: Schema.Types.ObjectId,
			ref: "Contract",
		},
		tenants: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		rent: {
			type: Number,
		},
		rentDate: {
			type: Date,
		},
		// history: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: "LeaseHistory",
		// 	},
		// ],
		// paymentHistory: [
		// 	{
		// 		type: Schema.Types.ObjectId,
		// 		ref: "Payment",
		// 	},
		// ],
	},
	{
		timestamps: true,
	}
);

const Lease = model("Lease", leaseSchema);

module.exports = Lease;
