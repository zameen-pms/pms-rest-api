const Application = require("./model");
const applicationValidation = require("./validate");

const createObject = async (req, res) => {
	try {
		const { error } = applicationValidation.validate(req.body);
		if (error?.details[0]?.message) {
			return res.status(400).json(error.details[0].message);
		}

		const object = new Application(req.body);
		await object.save();

		res.json(object);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getObjects = async (req, res) => {
	try {
		const objects = await Application.find(req.query);
		res.json(objects);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const checkObjectExists = async (req, res, next) => {
	try {
		const { id } = req.params;

		const object = await Application.findById(id);
		if (!object) {
			return res.status(404).json("Application not found.");
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
		const object = await Application.findById(id)
			.populate("property")
			.populate("user");
		res.json(object);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updateObjectById = async (req, res) => {
	try {
		const { _id: id } = req.object;
		const object = await Application.findByIdAndUpdate(id, req.body, {
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
		await Application.findByIdAndDelete(id);
		res.json(id);
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
};
