const router = require("express").Router();
const api = require("../../lib/api.js");
const Data = require("./dataModel.js");
const launchCacheObject = {
  data: null,
  updated: null,
};
router.get("/apis", async (req, res) => {
  //endpoint to return data about the api for building frontend API interface!
  const data = await Data.getAPIData();
  res.status(200).json(data);
});
router.get("/endpoints/:id", async (req, res) => {
  const data = await Data.getEndpointsByAPIID(req.params.id);
  res.status(200).json(data);
});
router.get("/parameters/:id", async (req, res) => {
  const data = await Data.getParametersByEndpointID(req.params.id);
  res.status(200).json(data);
});
router.get("/launch", async (req, res) => {
  if (
    launchCacheObject.updated &&
    Date.now() > launchCacheObject.updated + 100 * 60 * 60
  ) {
    console.log("refreshing cached data");
    const data = await api.get("/launch");
    launchCacheObject.data = data.data;
    res.status(200).json({ data: data.data });
  } else {
    res.status(200).json({ data: launchCacheObject.data });
  }
});

module.exports = router;
