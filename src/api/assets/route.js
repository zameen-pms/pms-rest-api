const {
	upload,
	uploadAsset,
	getAssetByKey,
	deleteAssetByKey,
	getAssetUrl,
} = require("./controller");

const router = require("express").Router();

router.post("/", upload.single("file"), uploadAsset);
router.get("/url/:key", getAssetUrl);
router.get("/:key", getAssetByKey);
router.delete("/:key", deleteAssetByKey);

module.exports = router;
