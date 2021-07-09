const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "get request to dataRouter" });
});

module.exports = router;
