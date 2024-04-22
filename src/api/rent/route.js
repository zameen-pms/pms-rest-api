const {
	createRent,
	getRent,
	checkRentExists,
	getRentById,
	updateRentById,
	deleteRentById,
} = require("./controller");

const router = require("express").Router();

router.post("/", createRent);
router.get("/", getRent);
router.get("/:id", checkRentExists, getRentById);
router.put("/:id", checkRentExists, updateRentById);
router.delete("/:id", checkRentExists, deleteRentById);

module.exports = router;
