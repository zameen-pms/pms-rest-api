const GenericRepository = require("../../repository");
const { SingleFamily } = require("./model");
const singleFamilyValidationSchema = require("./validate");

const singleFamilyRepo = new GenericRepository(SingleFamily);

const createSingleFamily = async (req, res) => {
	try {
		const { error } = singleFamilyRepo.validate(
			singleFamilyValidationSchema,
			req.body
		);
		if (error) {
			return res.status(400).json(error);
		}

		const singleFamily = await singleFamilyRepo.create(req.body);
		res.json(singleFamily);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getSingleFamilies = async (req, res) => {
	try {
		const singleFamilies = await SingleFamily.find(req.query);
		res.json(singleFamilies);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const checkSingleFamilyExists = async (req, res, next) => {
	try {
		const { id } = req.params;

		const singleFamily = await SingleFamily.findById(id)
			.populate("manager")
			.populate({
				path: "lease",
				populate: { path: "tenants" },
			});
		if (!singleFamily) {
			return res.status(404).json("Unit not found.");
		}

		req.singleFamily = singleFamily;
		next();
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getSingleFamilyById = async (req, res) => {
	try {
		res.json(req.singleFamily);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updateSingleFamilyById = async (req, res) => {
	try {
		const { _id: id } = req.singleFamily;
		const singleFamily = await singleFamilyRepo.updateById(id, req.body);
		res.json(singleFamily);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deleteSingleFamilyById = async (req, res) => {
	try {
		const { _id: id } = req.singleFamily;
		await singleFamilyRepo.remove(id);
		res.json(true);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createSingleFamily,
	getSingleFamilies,
	checkSingleFamilyExists,
	getSingleFamilyById,
	updateSingleFamilyById,
	deleteSingleFamilyById,
};
