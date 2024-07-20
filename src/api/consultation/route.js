const {
	createObject,
	getObjects,
	checkObjectExists,
	getObjectById,
	updateObjectById,
	deleteObjectById,
} = require("./controller");

const router = require("express").Router();

router.post("/", createObject);
router.get("/", getObjects);
router.get("/:id", checkObjectExists, getObjectById);
router.put("/:id", checkObjectExists, updateObjectById);
router.delete("/:id", checkObjectExists, deleteObjectById);

module.exports = router;
