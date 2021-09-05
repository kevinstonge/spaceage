const router = require("express").Router();
const axios = require("axios");
const swagger = require("../../../data/APIMetaData/spacedevsSwagger.js");
const db = require("../../../data/dbConfig.js");
const apiHost =
  process.env.NODE_ENV === "development"
    ? "https://lldev.thespacedevs.com"
    : `https://${swagger.host}`;
const queryLifespanHours = 24;
router.get("/apis", async (req, res) => {
  const data = swagger;
  res.status(200).json(data);
});
router.get("/*", async (req, res) => {
  const path = req.path;
  const subPath = req.path.split("/").slice(0,-2).join("/") + "/";
  if (swagger.paths[path] || swagger.paths[subPath]) {
    const cachedQuery = await db("QueryCache").where("QueryString", req.url);
    const queryLifespanMilliseconds = queryLifespanHours * 60 * 60 * 1000;
    const cacheResult = cachedQuery[0]
      ? (typeof cachedQuery[0] === "string")
        ? JSON.parse(cachedQuery[0].QueryResult)
        : cachedQuery[0]
      : null;
    console.log(cacheResult?.Timestamp);
    if (
      cacheResult?.Timestamp &&
      cacheResult?.Timestamp + queryLifespanMilliseconds > Date.now()
    ) {
      console.log(`${req.ip}->${req.url}: sending cached results`);
      res.status(200).json(JSON.parse(cacheResult.QueryResult).results);
    } else {
      axios
        .get(`${apiHost}${swagger.basePath}${req.url}`)
        .then(async (r) => {
          if (r.status === 404) {
            res.status(404).json({message: "not found"})
          } else if (r.status === 429) {
            res.status(429).json({message: "too many requests"})
          } else if (r.data) {
            const results = r.data.count ? r.data.results : [r.data]
            console.log(`${req.ip}->${req.url}: sending fresh results`);
            res.status(200).json(results);
            await db("QueryCache")
              .insert({
                QueryString: req.url,
                QueryResult: JSON.stringify({
                  results,
                }),
                Timestamp: Date.now(),
              })
              .onConflict("QueryString")
              .merge();
          } else {
            res.status(500).json({message: "something went wrong while processing your request"})
          }
        })
        .catch((e) => {
          if (e.status === 404) {
            res.status(404).json({message: "couldn't find anything at that endpoint"})
          } else {
            res.status(500).json({
              message: "something went wrong while processing your request",
              error: e,
            });
          }
        });
    }
  } else {
    res.status(400).json({
      message: "it doesn't look like the API understands that request",
    });
  }
});

module.exports = router;
