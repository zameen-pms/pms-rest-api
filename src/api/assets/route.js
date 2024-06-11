const {
	upload,
	uploadAsset,
	getAssetByKey,
	deleteAssetByKey,
} = require("./controller");

const router = require("express").Router();

router.post("/", upload.single("file"), uploadAsset);
router.get("/:key", getAssetByKey);
router.delete("/:key", deleteAssetByKey);

module.exports = router;
