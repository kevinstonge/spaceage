require("dotenv").config();
const axios = require("axios");
const apiURL =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_DATA_API
    : process.env.DEV_DATA_API;

module.exports = axios.create({ baseURL: apiURL });
