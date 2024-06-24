const verifyJwt = require("../../middleware/verifyJwt");
const {
	createUser,
	getUsers,
	checkUserExists,
	getUserById,
	updateUserById,
	deleteUserById,
} = require("./controller");

const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUsers);

router.use(verifyJwt);

router.get("/:id", checkUserExists, getUserById);
router.put("/:id", checkUserExists, updateUserById);
router.delete("/:id", checkUserExists, deleteUserById);

module.exports = router;
