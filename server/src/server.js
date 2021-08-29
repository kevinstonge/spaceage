const express = require("express");
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const helmet = require("helmet");
server.use(helmet());
const domains =
  process.env.NODE_ENV === "development"
    ? ["*", "http://localhost:3000"]
    : ["'self'", "https://spaceage.kevinstonge.com"];
server.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": domains,
      "img-src": [...domains, "blob:", "*"],
      upgradeInsecureRequests: [],
    },
  })
);
const cors = require("cors");
const corsConfig =
  process.env.NODE_ENV === "development"
    ? { origin: domains }
    : {
        credentials: true,
        origin: domains,
      };
server.use(cors(corsConfig));
const path = require("path");
server.use("/api/users", require("./api/users/userRouter.js"));
server.use("/api/data", require("./api/data/dataRouter.js"));
server.use("/media", express.static("../media"));
server.use(express.static("../../client/build"));
server.get("*", (req, res) => {
  if (
    ["js", "css", "png", "map", "json"].includes(
      req.path.split(".").slice(-1)[0]
    )
  ) {
    res.sendFile(path.join(__dirname, "../../client/build", req.path));
  } else {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
  }
});
module.exports = server;
