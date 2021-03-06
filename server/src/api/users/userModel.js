const db = require("../../../data/dbConfig.js");
const isEmail = require("validator/lib/isEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (userObject) => {
  try {
    const { email, password } = userObject;
    if (email && password && isEmail(email) && password.length > 0) {
      const [userExists] = await db("Users").where("Email", email);
      if (userExists) {
        return {
          status: 409,
          json: { message: "email already exists in user database" },
        };
      } else {
        const pwHash = bcrypt.hashSync(password, 7);
        await db("Users").insert({ "Email": email, "Password": pwHash });
        const [newUser] = await db("Users").where({ Email: email });
        if (newUser) {
          const token = jwt.sign(
            { userID: newUser.ID },
            process.env.JWT_SECRET
          );
          return { status: 201, json: { message: "account created", token } };
        }
      }
    } else {
      return {
        status: 400,
        json: {
          message:
            "the email and or password you provided are either missing or inadequate in nature",
        },
      };
    }
  } catch (err) {
    return { status: 500, json: { message: "server error", error: err } };
  }
};

const login = async ({ email, password }) => {
  try {
    const [user] = await db("Users").where("Email", email);
    if (user?.Password) {
      const authenticated = bcrypt.compareSync(password, user.Password);
      if (authenticated) {
        const token = jwt.sign({ userID: user.ID }, process.env.JWT_SECRET);
        return {
          status: 200,
          json: { message: "you are now logged in", token },
        };
      } else {
        return {
          status: 401,
          json: { message: "incorrect username and/or password" },
        };
      }
    }
  } catch (err) {
    return { status: 500, json: { message: "server error", error: err } };
  }
};

const getFavorites = async (userID) => {
  return await db("Favorites")
    .join("User_Favorites", "User_ID", "=", userID)
    .select("ID", "QueryString")
    .then((r) => {
      return { status: 200, json: { favorites: r } };
    })
    .catch((e) => {
      return {
        status: 500,
        json: {
          message: "unable to retrieve your favorites from the database",
          error: e,
        },
      };
    });
};

const addFavorite = async (userID, queryString) => {
  try {
    let favoriteID = null;
    return await db
      .transaction(async (trx) => {
        await db("Favorites")
          .transacting(trx)
          .insert({ QueryString: queryString })
          .onConflict("QueryString")
          .ignore();
        const [newFavorite] = await db("Favorites")
          .transacting(trx)
          .where({ QueryString: queryString });
        favoriteID = newFavorite.ID;
        if (favoriteID) {
          await db("User_Favorites")
            .transacting(trx)
            .insert({ User_ID: userID, Favorite_ID: favoriteID });
          // .then(() => {
          //   return {
          //     status: 201,
          //     json: {
          //       message: "favorite added",
          //       favorite: { ID: newFavorite.ID, QueryString: queryString },
          //     },
          //   };
          // })
          // .catch((e) => {
          //   throw e;
          // });
        } else {
          throw "failed to create favorite";
        }
      })
      .then((r) => {
        return {
          status: 201,
          json: {
            message: "favorite added",
            favorite: { ID: favoriteID, QueryString: queryString },
          },
        };
      })
      .catch((e) => {
        return {
          status: 500,
          message: "database transaction error",
          error: e,
        };
      });
  } catch (err) {
    return { status: 500, json: { message: "server error", error: err } };
  }
};

const removeFavorite = async (userID, favoriteID) => {
  try {
    if (userID && favoriteID) {
      return await db("User_Favorites")
        .where({ User_ID: userID, Favorite_ID: favoriteID })
        .del()
        .then((r) => {
          if (r > 0) {
            return { status: 200, json: { message: "deleted" } };
          } else {
            return {
              status: 500,
              json: { message: "unable to delete favorite" },
            };
          }
        })
        .catch((e) => {
          return {
            status: 500,
            message: "error deleting favoritge",
            error: e,
          };
        });
    } else {
      return {
        status: 400,
        message: "unable to identify user ID or favorite ID",
      };
    }
  } catch (err) {
    return { status: 500, json: { message: "server error", error: err } };
  }
};

module.exports = { signup, login, getFavorites, addFavorite, removeFavorite };
