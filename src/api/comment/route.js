const {
	createComment,
	getComments,
	checkCommentExists,
	getCommentById,
	updateCommentById,
	deleteCommentById,
} = require("./controller");

const router = require("express").Router();

router.post("/", createComment);
router.get("/", getComments);
router.get("/:id", checkCommentExists, getCommentById);
router.put("/:id", checkCommentExists, updateCommentById);
router.delete("/:id", checkCommentExists, deleteCommentById);

module.exports = router;
