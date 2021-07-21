const db = require("../../../data/dbConfig.js");

const getAPIData = async () => {
  const data = await db("API");
  return data;
};

const getEndpointsByAPIID = async (id) => {
  const data = await db("Endpoints").where({ API_ID: id });
  return data;
};

const getParametersByEndpointID = async (id) => {
  const data = await db("Endpoints_Parameters")
    .where({ Endpoint_ID: id })
    .leftJoin(
      "Parameters",
      "Parameters.ID",
      "Endpoints_Parameters.Parameter_ID"
    );
  return data;
};
module.exports = { getAPIData, getEndpointsByAPIID, getParametersByEndpointID };
