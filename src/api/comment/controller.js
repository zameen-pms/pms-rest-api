const GenericRepository = require("../../repository");
const { Comment } = require("./model");
const commentValidationSchema = require("./validate");

const commentRepo = new GenericRepository(Comment);

const createComment = async (req, res) => {
	try {
		const { error } = commentRepo.validate(
			commentValidationSchema,
			req.body
		);
		if (error) {
			return res.status(400).json(error);
		}

		const comment = await commentRepo.create({
			...req.body,
		});
		res.json(comment);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getComments = async (req, res) => {
	try {
		const comments = await Comment.find(req.query);
		res.json(comments);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const checkCommentExists = async (req, res, next) => {
	try {
		const { id } = req.params;

		const comment = await Comment.findById(id).populate("createdBy");
		if (!comment) {
			return res.status(404).json("Comment not found.");
		}

		req.comment = comment;
		next();
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getCommentById = async (req, res) => {
	try {
		res.json(req.comment);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updateCommentById = async (req, res) => {
	try {
		const comment = await commentRepo.updateById(req.comment._id, req.body);
		res.json(comment);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deleteCommentById = async (req, res) => {
	try {
		await commentRepo.remove(req.comment._id);
		res.json(true);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createComment,
	getComments,
	checkCommentExists,
	getCommentById,
	updateCommentById,
	deleteCommentById,
};
