const router = require("express").Router();

router.get("/", async (_req, res) => res.json({ ok: true }));

module.exports = router;
