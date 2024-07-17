const Contract = require("./model");
const contractValidation = require("./validate");

const createObject = async (req, res) => {
	try {
		const { error } = contractValidation.validate(req.body);
		if (error?.details[0]?.message) {
			return res.status(400).json(error.details[0].message);
		}

		const object = new Contract(req.body);
		await object.save();

		res.json(object);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const getObjects = async (req, res) => {
	try {
		const objects = await Contract.find(req.query);
		res.json(objects);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const checkObjectExists = async (req, res, next) => {
	try {
		const { id } = req.params;

		const object = await Contract.findById(id);
		if (!object) {
			return res.status(404).json("Contract not found.");
		}

		req.object = object;
		next();
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const getObjectById = async (req, res) => {
	try {
		const { _id: id } = req.object;
		const object = await Contract.findById(id).populate("parties");
		res.json(object);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const updateObjectById = async (req, res) => {
	try {
		const { _id: id } = req.object;
		const object = await Contract.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.json(object);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

const deleteObjectById = async (req, res) => {
	try {
		const { _id: id } = req.object;
		await Contract.findByIdAndDelete(id);
		res.json(id);
	} catch (err) {
		res.status(500).send(err.message);
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
