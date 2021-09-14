const knex = require("knex");
require("dotenv").config();
const config = require("../knexfile.js");
const nodeEnv = process.env.NODE_ENV || "development";
module.exports = knex(config[nodeEnv]);
