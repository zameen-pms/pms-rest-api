const Comment = require("../comment/model");
const WorkOrder = require("./model");
const workOrderValidation = require("./validate");

const createObject = async (req, res) => {
	try {
		const { error } = workOrderValidation.validate(req.body);
		if (error?.details[0]?.message) {
			return res.status(400).json(error.details[0].message);
		}

		const object = new WorkOrder(req.body);
		await object.save();

		res.json(object);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getObjects = async (req, res) => {
	try {
		const objects = await WorkOrder.find(req.query)
			.sort({ createdAt: -1 })
			.populate("property");
		res.json(objects);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const checkObjectExists = async (req, res, next) => {
	try {
		const { id } = req.params;

		const object = await WorkOrder.findById(id);
		if (!object) {
			return res.status(404).json("WorkOrder not found.");
		}

		req.object = object;
		next();
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getObjectById = async (req, res) => {
	try {
		const { _id: id } = req.object;
		const object = await WorkOrder.findById(id)
			.populate("property")
			.populate("createdBy")
			.populate({
				path: "comments",
				populate: {
					path: "user",
					model: "User",
				},
			});
		res.json(object);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updateObjectById = async (req, res) => {
	try {
		const { _id: id } = req.object;
		const object = await WorkOrder.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.json(object);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deleteObjectById = async (req, res) => {
	try {
		const { _id: id } = req.object;
		await Comment.deleteMany({ _id: { $in: req.object.comments } });
		await WorkOrder.findByIdAndDelete(id);
		res.json(id);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const addComment = async (req, res) => {
	try {
		const { commentId } = req.params;
		if (!commentId) {
			return res.status(400).json("commentId is required.");
		}

		const comment = await Comment.findById(commentId);
		if (!comment) {
			return res.status(400).json("Comment not found.");
		}

		const { object } = req;
		if (object.comments.includes(commentId)) {
			return res.status(400).json("Comment already added.");
		}

		object.comments.push(commentId);
		await object.save();

		res.json(commentId);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const removeCommentById = async (req, res) => {
	try {
		const { commentId } = req.params;
		if (!commentId) {
			return res.status(400).json("commentId is required.");
		}

		const { object } = req;
		object.comments = object.comments.filter(
			(comment) => comment === commentId
		);
		await object.save();

		res.json(commentId);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createObject,
	getObjects,
	checkObjectExists,
	getObjectById,
	updateObjectById,
	deleteObjectById,
	addComment,
	removeCommentById,
};
