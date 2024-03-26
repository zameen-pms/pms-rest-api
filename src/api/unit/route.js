const {
	createUnit,
	getUnits,
	checkUnitExists,
	getUnitById,
	updateUnitById,
	deleteUnitById,
} = require("./controller");

const router = require("express").Router();

router.post("/", createUnit);
router.get("/", getUnits);
router.get("/:id", checkUnitExists, getUnitById);
router.put("/:id", checkUnitExists, updateUnitById);
router.delete("/:id", checkUnitExists, deleteUnitById);

module.exports = router;
