const { sendEmail } = require("./controller");

const router = require("express").Router();

router.post("/send", sendEmail);

module.exports = router;
