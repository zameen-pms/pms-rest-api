const router = require("express").Router();

router.get("/", async (_req, res) => res.json({ ok: false }));

module.exports = router;
