const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {login, signup, getFavorites, addFavorite, removeFavorite} = require('./userModel.js');
router.get("/", (req, res) => {
  res.json({ message: "get request to userRouter" });
});

router.post("/signup", async (req,res) => {
  try {
    const email = req.body.email || "";
    const password = req.body.password || "";
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

router.post("/favorites/add", async(req,res) => {
  try {
    const token = req.headers?.authorization ? req.headers.authorization.replace("Bearer ", ""): "";
    if (token !== "" && req.body?.favorite) {
      const addedFavorite = await addFavorite(token, req.body.favorite);
      if (addedFavorite) {
        res.status(201).json({message:"successfully added favorite"});
      } else {
        res.status(500).json({message:"server error"});
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"server error", error: err})
  }
});

router.delete("/favorites/remove", async(req,res) => {
  try {
    const token = req.headers?.authorization ? req.headers.authorization.replace("Bearer ", ""): "";
    if (token !== "" && req.body?.favorite) {
      const removed = await removeFavorite(token, req.body.favorite);
      if (removed) {
        res.status(removed.status).json(removed.json);
      } else {
        res.status(500).json({message:"error removing favorite 66"});
      }
    } else {
      res.status(500).json({message:"error removing favorite 69"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"server error", error: err})
  }
})

router.get("/favorites", async(req,res) => {
  try {
    const token = req.headers?.authorization ? req.headers.authorization.replace("Bearer ", "") : "";
    const favorites = await getFavorites(token);
    if (favorites.status) {
      res.status(favorites.status).json(favorites.json);
    }
    else {
      res.status(500).json({message: "error retrieving favorites from the database"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "server error"})
  }
});

module.exports = router;
