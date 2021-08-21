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
  const path = req.path.replace("/id/", "/{id}/");
  const fixedURL = req.url.replace("?id=", "").replace("id/", "");
  if (swagger.paths[path]) {
    const cachedQuery = await db("QueryCache").where("QueryString", fixedURL);
    console.log(cachedQuery);
    const queryLifespanMilliseconds = queryLifespanHours * 60 * 60 * 1000;
    if (
      cachedQuery[0]?.timestamp &&
      cachedQuery[0].timestamp + queryLifespanMilliseconds < Date.now()
    ) {
      console.log("queryCache exists and is up to date");
      res.status(200).json({ results: cachedQuery[0].results });
    } else {
      axios
        .get(`${apiHost}${swagger.basePath}${fixedURL}`)
        .then(async (r) => {
          if (r.data?.count) {
            res.status(200).json(r.data);
            const dbInsertion = await db("QueryCache").insert({
              QueryString: fixedURL,
              QueryResult: {
                timestamp: Date.now(),
                results: r.data.results,
              },
            });
            const log = await db("QueryCache");
            console.log(log);
          } else {
            res.status(200).json({ results: [r.data] });
            await db("QueryCache").insert({
              QueryString: fixedURL,
              QueryResult: {
                timestamp: Date.now(),
                results: [r.data],
              },
            });
          }
        })
        .catch((e) => {
          console.log(e);
          res.status(500).json({
            message: "something went wrong while processing your request",
            error: e,
          });
        });
    }
  } else {
    res.status(400).json({
      message: "it doesn't look like the API understands that request",
    });
  }
});

module.exports = router;
