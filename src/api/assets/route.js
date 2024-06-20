const verifyJwt = require("../../middleware/verifyJwt");
const {
	upload,
	uploadAsset,
	getAssetByKey,
	deleteAssetByKey,
	getAssetUrl,
} = require("./controller");

const router = require("express").Router();

router.get("/url/:key", getAssetUrl);

router.use(verifyJwt);

router.post("/", upload.single("file"), uploadAsset);
router.get("/:key", getAssetByKey);
router.delete("/:key", deleteAssetByKey);

module.exports = router;
