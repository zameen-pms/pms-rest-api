const {
	createPropertyData,
	getPropertyData,
	checkPropertyDataExists,
	getPropertyDataById,
	updatePropertyDataById,
	deletePropertyDataById,
} = require("./controller");

const router = require("express").Router();

router.post("/", createPropertyData);
router.get("/", getPropertyData);
router.get("/:id", checkPropertyDataExists, getPropertyDataById);
router.put("/:id", checkPropertyDataExists, updatePropertyDataById);
router.delete("/:id", checkPropertyDataExists, deletePropertyDataById);

module.exports = router;
