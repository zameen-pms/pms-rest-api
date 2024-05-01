const {
	createWorkOrder,
	getWorkOrders,
	checkWorkOrderExists,
	getWorkOrderById,
	updateWorkOrderById,
	deleteWorkOrderById,
} = require("./controller");

const router = require("express").Router();

router.post("/", createWorkOrder);
router.get("/", getWorkOrders);
router.get("/:id", checkWorkOrderExists, getWorkOrderById);
router.put("/:id", checkWorkOrderExists, updateWorkOrderById);
router.delete("/:id", checkWorkOrderExists, deleteWorkOrderById);

module.exports = router;
