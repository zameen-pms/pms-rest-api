const {
	upload,
	uploadAsset,
	deleteAssetByKey,
	getAsset,
} = require("./controller");

const router = require("express").Router();

router.post("/", upload.single("file"), uploadAsset);
router.get("/:key", getAsset);
router.delete("/:key", deleteAssetByKey);

module.exports = router;
