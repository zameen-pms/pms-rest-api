const {
	createProperty,
	getProperties,
	checkPropertyExists,
	getPropertyById,
	updatePropertyById,
	deletePropertyById,
	addUnit,
	removeUnit,
} = require("./controller");

const router = require("express").Router();

router.post("/", createProperty);
router.get("/", getProperties);
router.get("/:id", checkPropertyExists, getPropertyById);
router.put("/:id", checkPropertyExists, updatePropertyById);
router.delete("/:id", checkPropertyExists, deletePropertyById);

router.post("/:id/units/:unitId", checkPropertyExists, addUnit);
router.delete("/:id/units/:unitId", checkPropertyExists, removeUnit);

module.exports = router;
