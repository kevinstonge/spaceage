const router = require("express").Router();
const api = require("../../lib/api.js");

const launchCacheObject = {
  data: null,
  updated: null,
}

router.get("/launch", async (req, res) => {
  if (launchCacheObject.updated && Date.now() > launchCacheObject.updated + (100 * 60 * 60)) {
    console.log('refreshing cached data');
    const data = await api.get("/launch");
    launchCacheObject.data = data.data;
    res.status(200).json({ data: data.data})
  }
  else {
    res.status(200).json({ data: launchCacheObject.data })
  }
});

module.exports = router;
