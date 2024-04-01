const GenericRepository = require("../../repository");
const { Unit } = require("../unit/model");
const { Property } = require("./model");
const propertyValidationSchema = require("./validate");

const propertyRepo = new GenericRepository(Property);

const createProperty = async (req, res) => {
	try {
		const { error } = propertyRepo.validate(
			propertyValidationSchema,
			req.body
		);
		if (error) {
			return res.status(400).json(error);
		}

		const property = await propertyRepo.create(req.body);
		res.json(property);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getProperties = async (req, res) => {
	try {
		const properties = await Property.find(req.query);
		res.json(properties);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const checkPropertyExists = async (req, res, next) => {
	try {
		const { id } = req.params;

		const property = await propertyRepo.findById(id);
		if (!property) {
			return res.status(404).json("Property not found.");
		}

		req.property = property;
		next();
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getPropertyById = async (req, res) => {
	try {
		res.json(req.property);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updatePropertyById = async (req, res) => {
	try {
		const { _id: id } = req.property;
		const property = await propertyRepo.updateById(id, req.body);
		res.json(property);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deletePropertyById = async (req, res) => {
	try {
		const { _id: id } = req.property;

		await propertyRepo.remove(id);
		res.json(true);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const addUnit = async (req, res) => {
	try {
		const { unitId } = req.params;

		const unit = await Unit.findById(unitId);
		if (!unit) {
			return res.status(404).json("Unit not found.");
		}

		if (req.property.units.includes(unitId)) {
			return res.sendStatus(204);
		}

		req.property.units.push(unitId);
		await req.property.save();

		res.json(unitId);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const removeUnit = async (req, res) => {
	try {
		const { unitId } = req.params;

		if (!req.property.units.includes(unitId)) {
			return res.sendStatus(204);
		}

		req.property.units = req.property.units.filter(
			(units) => units._id === unitId
		);
		await req.property.save();

		res.json(unitId);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createProperty,
	getProperties,
	checkPropertyExists,
	getPropertyById,
	updatePropertyById,
	deletePropertyById,
	addUnit,
	removeUnit,
};
