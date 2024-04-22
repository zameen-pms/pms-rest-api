const GenericRepository = require("../../repository");
const { PropertyData } = require("./model");

const propertyDataRepo = new GenericRepository(PropertyData);

const createPropertyData = async (req, res) => {
	try {
		const propertyData = await propertyDataRepo.create(req.body);
		res.json(propertyData);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getPropertyData = async (req, res) => {
	try {
		const propertyData = await PropertyData.find(req.query);
		res.json(propertyData);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const checkPropertyDataExists = async (req, res, next) => {
	try {
		const { id } = req.params;

		const propertyData = await propertyDataRepo.findById(id);
		if (!propertyData) {
			return res.status(404).json("Property Data not found.");
		}

		req.propertyData = propertyData;
		next();
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getPropertyDataById = async (req, res) => {
	try {
		res.json(req.propertyData);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updatePropertyDataById = async (req, res) => {
	try {
		const propertyData = await propertyDataRepo.updateById(
			req.propertyData._id,
			req.body
		);
		res.json(propertyData);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deletePropertyDataById = async (req, res) => {
	try {
		await propertyDataRepo.remove(req.propertyData._id);
		res.json(true);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createPropertyData,
	getPropertyData,
	checkPropertyDataExists,
	getPropertyDataById,
	updatePropertyDataById,
	deletePropertyDataById,
};
