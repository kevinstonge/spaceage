const express = require("express");
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const helmet = require("helmet");
server.use(helmet());
const domains =
  process.env.NODE_ENV === "development"
    ? ["*"]
    : ["self", "https://spaceage.kevinstonge.com"];
const sources =
  process.env.NODE_ENV === "development"
    ? "unsafe-inline"
    : ["'self'", ...domains];
server.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["*"],
      "img-src": ["'self'", "blob:", "spaceage.kevinstonge.com"],
      upgradeInsecureRequests: [],
    },
  })
);
const cors = require("cors");
const corsConfig =
  process.env.NODE_ENV === "development"
    ? { origin: "*" }
    : {
        credentials: true,
        origin: domains,
      };
server.use(cors(corsConfig));
const path = require("path");
server.use("/api/users", require("./api/users/userRouter.js"));
server.use("/api/data", require("./api/data/dataRouter.js"));
server.use("/media", express.static("../media"));
server.use(express.static("../../client/build/"));
server.get("*", (req, res) => {
  if (req.path === "/") {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
  } else {
    res.sendFile(
      path.join(__dirname, "../../client/build", req.path),
      (err) => {
        if (err) {
          res.status(404).json({ message: `${req.path} not found` });
        }
      }
    );
  }
});

module.exports = server;
