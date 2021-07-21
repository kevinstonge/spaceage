const db = require("../../../data/dbConfig.js");

const getAPIData = async () => {
  const data = await db("API");
  return data;
};

module.exports = { getAPIData };
