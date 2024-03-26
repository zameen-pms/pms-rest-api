const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["Admin", "Manager", "Owner", "Tenant"],
			default: "Tenant",
		},
		firstName: { type: String },
		lastName: { type: String },
		status: {
			type: String,
			enum: ["Active", "Disabled"],
			default: "Active",
		},
		refreshToken: { type: String },
		resetToken: { type: String },
		resetTokenExpiry: {
			type: Date,
			default: () => new Date(),
		},
	},
	{
		timestamps: true,
	}
);

const User = model("User", userSchema);

module.exports = {
	userSchema,
	User,
};
