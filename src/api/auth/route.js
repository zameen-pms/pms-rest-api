const verifyJwt = require("../../middleware/verifyJwt");
const {
	handleRefreshToken,
	handleLogout,
	handleLogin,
	handleResetRequest,
	handleResetPassword,
} = require("./controller");

const router = require("express").Router();

router.post("/login", handleLogin);
router.use(verifyJwt);
router.get("/refresh", handleRefreshToken);
router.get("/logout", handleLogout);
router.post("/request-reset", handleResetRequest);
router.post("/reset-password", handleResetPassword);

module.exports = router;
