const router = require("express").Router();
// const api = require("../../lib/api.js");
const axios = require('axios');
const Data = require("./dataModel.js");
const db = require('../../../data/dbConfig.js');
const { urlencoded } = require("express");

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
router.get("/Launch/*", async (req, res) => {
  const apiList = await db('API').where('Name','Launch');
  const reqURLArray = req.url.split('/').splice(1);
  const apiName = reqURLArray[0];
  const api = apiList.filter(api=>api.Name === apiName);
  if (api[0].Name) {
    // const endpointList = await db('Endpoints').where('API_ID',api.ID);
    const endpointList = await db('Endpoints').where('API_ID',api[0].ID);
    const endpointName = decodeURI(reqURLArray[1]);
    console.log(endpointName);
    const endpoint = endpointList.filter(endpoint=>endpoint.Name===endpointName);
    if (endpoint[0]) {
      const reqURL = `${api[0].DevURL}${endpoint[0].Path}${reqURLArray.splice(2).join('')}`;
      console.log(reqURL);

    } else {
      console.log('bad endpoint');
    }
    
  }
  else { 
    console.log('invalid api');
  }
  if (
    launchCacheObject.updated ||
    Date.now() > launchCacheObject.updated + 100 * 60 * 60
  ) {
    try {
      console.log("refreshing cached data");
      const data = await axios.get(`req.url`);
      launchCacheObject.data = data.data;
      launchCacheObject.updated = Date.now();
      res.status(200).json({ data: data.data });
    } catch (err) {
      res.status(500).json({ message: "server error", err });
    }
    
  } else {
    res.status(200).json({ data: launchCacheObject.data });
  }
});

module.exports = router;
