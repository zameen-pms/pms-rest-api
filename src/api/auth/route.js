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
router.post("/refresh", handleRefreshToken);
router.post("/logout", handleLogout);
router.post("/request-reset", handleResetRequest);
router.post("/reset-password", handleResetPassword);

module.exports = router;
