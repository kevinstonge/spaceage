const router = require("express").Router();
// const api = require("../../lib/api.js");
const axios = require('axios');
const Data = require("./dataModel.js");
const db = require('../../../data/dbConfig.js');

const launchCacheObject = { };
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
    const endpoint = endpointList.filter(endpoint=>endpoint.Name===endpointName);
    if (endpoint[0]) {
      const reqURL = `${api[0].DevURL}${endpoint[0].Path}${reqURLArray.splice(2).join('')}`;
      console.log(reqURL);
      if (
        !launchCacheObject[reqURL] || Date.now() > launchCacheObject[reqURL].updated + 100 * 60 * 60
      ) {
        try {
          console.log("refreshing cached data");
          axios.get(`${reqURL}&format=json`)
            .then(r=>{
              launchCacheObject[reqURL] = { };
              launchCacheObject[reqURL].data = {...r.data};
              launchCacheObject[reqURL].updated = Date.now();
              res.status(200).json({ ...r.data });
            })
            .catch(e=>{
              console.log(e);
              res.status(500).json({message: "error communicating with thespacedevs API", e})
            });
        } catch (err) {
          res.status(500).json({ message: "server error", err });
        }
        
      } else {
        res.status(200).json({ ...launchCacheObject[reqURL].data });
      }

    } else {
      console.log('bad endpoint');
    }
    
  }
  else { 
    console.log('invalid api');
  }
});

module.exports = router;
