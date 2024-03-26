const {
	createLease,
	getLeases,
	checkLeaseExists,
	getLeaseById,
	updateLeaseById,
	deleteLeaseById,
} = require("./controller");

const router = require("express").Router();

router.post("/", createLease);
router.get("/", getLeases);
router.get("/:id", checkLeaseExists, getLeaseById);
router.put("/:id", checkLeaseExists, updateLeaseById);
router.delete("/:id", checkLeaseExists, deleteLeaseById);

module.exports = router;
