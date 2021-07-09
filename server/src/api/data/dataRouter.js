const router = require("express").Router();
const api = require("../../lib/api.js");
router.get("/", async (req, res) => {
  const data = await api.get("/launch");
  res.status(200).json({ data: data.data });
});

module.exports = router;
