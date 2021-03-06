const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    const token = req.headers?.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : null;
    if (token) {
      const userID = jwt.verify(token, process.env.JWT_SECRET);
      req.userID = userID.userID;
      if (req.userID > 0) {
        next();
      } else {
        throw err;
      }
    }
  } catch (err) {
    res.status(401).json({ message: "unauthorized", error: err });
  }
};

module.exports = auth;
