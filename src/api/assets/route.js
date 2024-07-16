const verifyJwt = require("../../middleware/verifyJwt");
const {
	upload,
	uploadAsset,
	deleteAssetByKey,
	getAsset,
	getRedirectUrl,
} = require("./controller");

const router = require("express").Router();

router.get("/:key/redirect", getRedirectUrl);

router.use(verifyJwt);

router.post("/", upload.single("file"), uploadAsset);
router.get("/:key", getAsset);
router.delete("/:key", deleteAssetByKey);

module.exports = router;
