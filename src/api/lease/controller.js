const GenericRepository = require("../../repository");
const { Lease } = require("./model");
const leaseValidationSchema = require("./validate");

const leaseRepo = new GenericRepository(Lease);

const createLease = async (req, res) => {
	try {
		const { error } = leaseRepo.validate(leaseValidationSchema, req.body);
		if (error) {
			return res.status(400).json(error);
		}

		const lease = await leaseRepo.create(req.body);
		res.json(lease);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getLeases = async (req, res) => {
	try {
		const leases = await Lease.find(req.query)
			.populate("unit")
			.populate("tenants");
		res.json(leases);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const checkLeaseExists = async (req, res, next) => {
	try {
		const { id } = req.params;

		const lease = await leaseRepo.findById(id);
		if (!lease) {
			return res.status(404).json("Lease not found.");
		}

		req.lease = lease;
		next();
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getLeaseById = async (req, res) => {
	try {
		res.json(req.lease);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updateLeaseById = async (req, res) => {
	try {
		const { _id: id } = req.lease;
		const lease = await leaseRepo.updateById(id, req.body);
		res.json(lease);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deleteLeaseById = async (req, res) => {
	try {
		const { _id: id } = req.lease;

		await leaseRepo.remove(id);
		res.json(true);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createLease,
	getLeases,
	checkLeaseExists,
	getLeaseById,
	updateLeaseById,
	deleteLeaseById,
};
