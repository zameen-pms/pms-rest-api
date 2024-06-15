const {
	createObject,
	getObjects,
	checkObjectExists,
	getObjectById,
	updateObjectById,
	deleteObjectById,
	addComment,
	removeCommentById,
} = require("./controller");

const router = require("express").Router();

router.post("/", createObject);
router.get("/", getObjects);
router.get("/:id", checkObjectExists, getObjectById);
router.put("/:id", checkObjectExists, updateObjectById);
router.delete("/:id", checkObjectExists, deleteObjectById);

router.post("/:id/comments/:commentId", checkObjectExists, addComment);
router.delete("/:id/comments/:commentId", checkObjectExists, removeCommentById);

module.exports = router;
