const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
	{
		type: {
			type: String,
			enum: ["Income", "Expense"],
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
