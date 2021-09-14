const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {login, signup} = require('./userModel.js');
router.get("/", (req, res) => {
  res.json({ message: "get request to userRouter" });
});

router.post("/signup", async (req,res) => {
  try {
    const email = req.body.email || null;
    const password = req.body.password || null;
    const {status, json} = await signup({email,password});
    if (status && json) {
      res.status(status).json(json)
    }
    else {
      res.status(500).json({message: "error encountered while creating user account"});
    }
  } catch (err) {
    res.status(500).json({message: "error creating account", error: JSON.stringify(err)})
  }
})

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email || null;
    const password = req.body.password || null;
    const authorized = await login({ email, password });
    if (authorized) {
      res.status(authorized.status).json(authorized.json);
    } else {
      res.status(401).json({message: "incorrect email or password provided"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"server error"});
    throw error;
  }
});

module.exports = router;
