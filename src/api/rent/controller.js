const GenericRepository = require("../../repository");
const { Rent } = require("./model");
const rentValidationSchema = require("./validate");

const rentRepo = new GenericRepository(Rent);

const createRent = async (req, res) => {
	try {
		const { error } = rentRepo.validate(rentValidationSchema, req.body);
		if (error) {
			return res.status(400).json(error);
		}

		const rent = await rentRepo.create(req.body);
		res.json(rent);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getRent = async (req, res) => {
	try {
		const rent = await Rent.find(req.query);
		res.json(rent);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const checkRentExists = async (req, res, next) => {
	try {
		const { id } = req.params;

		const rent = await Rent.findById(id)
			.populate("property")
			.populate("tenant");
		if (!rent) {
			return res.status(404).json("Rent not found.");
		}

		req.rent = rent;
		next();
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getRentById = async (req, res) => {
	try {
		res.json(req.rent);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updateRentById = async (req, res) => {
	try {
		const rent = await rentRepo.updateById(req.rent._id, req.body);
		res.json(rent);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deleteRentById = async (req, res) => {
	try {
		await rentRepo.remove(req.rent._id);
		res.json(true);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createRent,
	getRent,
	checkRentExists,
	getRentById,
	updateRentById,
	deleteRentById,
};
