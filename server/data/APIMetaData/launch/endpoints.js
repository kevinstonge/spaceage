const launchListParameters = require("./launchListParameters.js");
const launchListResultFields = require("./launchListResultFields.js");
module.exports = [
  {
    name: "all launches",
    path: "/",
    parameters: launchListParameters,
    resultFields: launchListResultFields,
  },
  {
    name: "previous launches",
    path: "/previous",
    parameters: launchListParameters,
    resultFields: launchListResultFields,
  },
  {
    name: "upcoming launches",
    parameters: launchListParameters,
    resultFields: launchListResultFields,
  },
];
