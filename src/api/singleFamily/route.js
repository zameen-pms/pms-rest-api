const {
	createSingleFamily,
	getSingleFamilies,
	checkSingleFamilyExists,
	getSingleFamilyById,
	updateSingleFamilyById,
	deleteSingleFamilyById,
} = require("./controller");

const router = require("express").Router();

router.post("/", createSingleFamily);
router.get("/", getSingleFamilies);
router.get("/:id", checkSingleFamilyExists, getSingleFamilyById);
router.put("/:id", checkSingleFamilyExists, updateSingleFamilyById);
router.delete("/:id", checkSingleFamilyExists, deleteSingleFamilyById);

module.exports = router;
