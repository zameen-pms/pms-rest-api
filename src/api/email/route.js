const { sendEmail } = require("./controller");

const router = require("express").Router();

router.post("/", sendEmail);

module.exports = router;
