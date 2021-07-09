const knex = require("knex");
require("dotenv").config();
module.exports = knex.config(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);
