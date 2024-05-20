const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
	{
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		content: { type: String, required: true },
	},
	{ timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = {
	commentSchema,
	Comment,
};
