const {
	upload,
	uploadAsset,
	deleteAssetByKey,
	getAsset,
	getRedirectUrl,
} = require("./controller");

const router = require("express").Router();

router.post("/", upload.single("file"), uploadAsset);
router.get("/:key", getAsset);
router.get("/:key/redirect", getRedirectUrl);
router.delete("/:key", deleteAssetByKey);

module.exports = router;
