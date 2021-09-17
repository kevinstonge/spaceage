const router = require("express").Router();
const {
  login,
  signup,
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("./userModel.js");
const auth = require("../../lib/auth.js");
router.get("/", (req, res) => {
  res.json({ message: "get request to userRouter" });
});

router.post("/signup", async (req, res) => {
  try {
    const email = req.body.email || "";
    const password = req.body.password || "";
    const { status, json } = await signup({ email, password });
    if (status && json) {
      res.status(status).json(json);
    } else {
      res
        .status(500)
        .json({ message: "error encountered while creating user account" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "error creating account", error: JSON.stringify(err) });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email || null;
    const password = req.body.password || null;
    const authorized = await login({ email, password });
    if (authorized) {
      res.status(authorized.status).json(authorized.json);
    } else {
      res.status(401).json({ message: "incorrect email or password provided" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
    throw error;
  }
});

router.post("/favorites/add", auth, async (req, res) => {
  try {
    if (req.userID && req.body?.favorite) {
      const addedFavorite = await addFavorite(req.userID, req.body.favorite);
      if (addedFavorite.status) {
        res.status(addedFavorite.status).json(addedFavorite.json);
      } else {
        res.status(500).json({ message: "server error" });
      }
    } else {
      res.status(400).json({ message: "unable to add favorite" });
    }
  } catch (err) {
    res.status(500).json({ message: "server error", error: err });
  }
});

router.delete("/favorites/remove", auth, async (req, res) => {
  try {
    if (req.userID && req.body?.favoriteID) {
      const removed = await removeFavorite(req.userID, req.body.favoriteID);
      if (removed.status) {
        res.status(removed.status).json(removed.json);
      } else {
        res.status(500).json({ message: "error removing favorite" });
      }
    } else {
      res.status(400).json({ message: "unable to remove favorite" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", error: err });
  }
});

router.get("/favorites", auth, async (req, res) => {
  try {
    const favorites = await getFavorites(req.userID);
    if (favorites.status) {
      res.status(favorites.status).json(favorites.json);
    } else {
      res
        .status(500)
        .json({ message: "error retrieving favorites from the database" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
