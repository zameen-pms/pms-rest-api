const verifyJwt = require("../../middleware/verifyJwt");
const {
	createObject,
	getObjects,
	checkObjectExists,
	getObjectById,
	updateObjectById,
	deleteObjectById,
	getObjectByToken,
	updateObjectByToken,
} = require("./controller");

const router = require("express").Router();

router.post("/", createObject);
router.get("/", getObjects);
router.get("/:id", checkObjectExists, getObjectById);
router.get("/token/:token", getObjectByToken);
router.put("/token/:token", updateObjectByToken);
router.put("/:id", checkObjectExists, updateObjectById);
router.delete("/:id", checkObjectExists, deleteObjectById);

module.exports = router;
