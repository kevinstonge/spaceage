const router = require("express").Router();
const axios = require("axios");
const swagger = require("../../../data/APIMetaData/spacedevsSwagger.js");
const apiHost =
  process.env.NODE_ENV === "development"
    ? "https://lldev.thespacedevs.com"
    : `https://${swagger.host}`;
const queryCacheObject = {};
router.get("/apis", async (req, res) => {
  const data = swagger;
  res.status(200).json(data);
});
router.get("/*", async (req, res) => {
  console.log(req.url);
  if (swagger.paths[req.path]) {
    axios
      .get(`${apiHost}${swagger.basePath}${req.url}`)
      .then((r) => {
        console.log(r);
        res.status(200).json(r.data);
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ error: "something wrong" });
      });
  } else {
    res.status(200).json({ message: "hello world" });
  }
});

module.exports = router;
