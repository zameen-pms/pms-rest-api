const GenericRepository = require("../../repository");
const { PropertyData } = require("../propertyData/model");
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

		const propertyData = await PropertyData.create({});
		if (!propertyData) {
			return res
				.status(400)
				.json("Unable to create property data for property.");
		}

		const property = await propertyRepo.create({
			...req.body,
			propertyData: propertyData._id,
		});
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

		const property = await Property.findById(id).populate("propertyData");
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
		const property = await propertyRepo.updateById(
			req.property._id,
			req.body
		);
		res.json(property);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deletePropertyById = async (req, res) => {
	try {
		if (req.property.propertyData) {
			await PropertyData.findOneAndDelete(req.property.propertyData);
		}
		await propertyRepo.remove(req.property._id);
		res.json(true);
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
};
