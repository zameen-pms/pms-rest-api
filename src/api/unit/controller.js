const GenericRepository = require("../../repository");
const { Unit } = require("./model");
const unitValidationSchema = require("./validate");

const unitRepo = new GenericRepository(Unit);

const createUnit = async (req, res) => {
	try {
		const { error } = unitRepo.validate(unitValidationSchema, req.body);
		if (error) {
			return res.status(400).json(error);
		}

		const unit = await unitRepo.create(req.body);
		res.json(unit);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getUnits = async (req, res) => {
	try {
		const units = await Unit.find(req.query).populate({
			path: "lease",
			populate: {
				path: "tenants",
			},
		});
		res.json(units);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const checkUnitExists = async (req, res, next) => {
	try {
		const { id } = req.params;

		const unit = await unitRepo.findById(id);
		if (!unit) {
			return res.status(404).json("Unit not found.");
		}

		req.unit = unit;
		next();
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getUnitById = async (req, res) => {
	try {
		res.json(req.unit);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updateUnitById = async (req, res) => {
	try {
		const { _id: id } = req.unit;
		const unit = await unitRepo.updateById(id, req.body);
		res.json(unit);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deleteUnitById = async (req, res) => {
	try {
		const { _id: id } = req.unit;

		await unitRepo.remove(id);
		res.json(true);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createUnit,
	getUnits,
	checkUnitExists,
	getUnitById,
	updateUnitById,
	deleteUnitById,
};
