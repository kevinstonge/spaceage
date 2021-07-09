const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "get request to userRouter" });
});

module.exports = router;
