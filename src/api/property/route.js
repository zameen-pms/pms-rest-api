const verifyJwt = require("../../middleware/verifyJwt");
const {
	createProperty,
	getProperties,
	checkPropertyExists,
	getPropertyById,
	updatePropertyById,
	deletePropertyById,
} = require("./controller");

const router = require("express").Router();

router.get("/", getProperties);
router.get("/:id", checkPropertyExists, getPropertyById);

router.use(verifyJwt);

router.post("/", createProperty);
router.put("/:id", checkPropertyExists, updatePropertyById);
router.delete("/:id", checkPropertyExists, deletePropertyById);

module.exports = router;
