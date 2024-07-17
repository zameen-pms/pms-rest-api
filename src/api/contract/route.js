const {
	getObjects,
	createObject,
	checkObjectExists,
	getObjectById,
	updateObjectById,
	deleteObjectById,
} = require("./controller");

const router = require("express").Router();

router.get("/", getObjects);
router.post("/", createObject);
router.get("/:id", checkObjectExists, getObjectById);
router.put("/:id", checkObjectExists, updateObjectById);
router.delete("/:id", checkObjectExists, deleteObjectById);

module.exports = router;
