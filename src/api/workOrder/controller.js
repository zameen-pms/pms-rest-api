const GenericRepository = require("../../repository");
const { Comment } = require("../comment/model");
const { WorkOrder } = require("./model");
const workOrderValidationSchema = require("./validate");

const workOrderRepo = new GenericRepository(WorkOrder);

const createWorkOrder = async (req, res) => {
	try {
		const { error } = workOrderRepo.validate(
			workOrderValidationSchema,
			req.body
		);
		if (error) {
			return res.status(400).json(error);
		}

		const workOrder = await workOrderRepo.create({
			...req.body,
		});
		res.json(workOrder);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getWorkOrders = async (req, res) => {
	try {
		const workOrders = await WorkOrder.find(req.query);
		res.json(workOrders);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const checkWorkOrderExists = async (req, res, next) => {
	try {
		const { id } = req.params;

		const workOrder = await WorkOrder.findById(id)
			.populate("property")
			.populate("comments");
		if (!workOrder) {
			return res.status(404).json("Work Order not found.");
		}

		req.workOrder = workOrder;
		next();
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const getWorkOrderById = async (req, res) => {
	try {
		res.json(req.workOrder);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const updateWorkOrderById = async (req, res) => {
	try {
		const workOrder = await workOrderRepo.updateById(
			req.workOrder._id,
			req.body
		);
		res.json(workOrder);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

const deleteWorkOrderById = async (req, res) => {
	try {
		await Comment.deleteMany({ _id: { $in: req.workOrder.comments } });
		await workOrderRepo.remove(req.workOrder._id);
		res.json(true);
	} catch (err) {
		res.status(500).json(err.message);
	}
};

module.exports = {
	createWorkOrder,
	getWorkOrders,
	checkWorkOrderExists,
	getWorkOrderById,
	updateWorkOrderById,
	deleteWorkOrderById,
};
