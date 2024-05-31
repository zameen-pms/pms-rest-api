const GenericRepository = require("../../repository");
const Transaction = require("./model");
const transactionValidationSchema = require("./validate");

const transactionRepo = new GenericRepository(Transaction);

const createObject = async (req, res) => {
	try {
		const { error } = transactionRepo.validate(
			transactionValidationSchema,
			req.body
		);
		if (error) {
			return res.status(400).json(error);
		}

		const object = new Transaction(req.body);
		await object.save();

		res.json(object);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getObjects = async (req, res) => {
	try {
		const objects = await Transaction.find(req.query);
		res.json(objects);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const checkObjectExists = async (req, res, next) => {
	try {
		const { id } = req.params;

		const object = await Transaction.findById(id);
		if (!object) {
			return res.status(404).json("Transaction not found.");
		}

		req.object = object;
		next();
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getObjectById = async (req, res) => {
	try {
		res.json(req.object);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updateObjectById = async (req, res) => {
	try {
		const { _id: id } = req.object;
		const object = await Transaction.findByIdAndUpdate(id, req.body, {
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
		await Transaction.findByIdAndDelete(id);
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
