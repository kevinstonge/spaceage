const db = require("../../../data/dbConfig.js");
const isEmail = require("validator/lib/isEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const signup = async (userObject) => {
  try {
    const { email, password } = userObject;
    if (email && password && isEmail(email) && password.length > 0) {
      const [userExists] = await db("Users").where("Email",email);
      if (userExists) {
        return({status:409, json: {message:"email already exists in user database"}});
      } else {
        const pwHash = bcrypt.hashSync(password,7);
        const [newUser] = await db("Users").insert({email,password: pwHash})
        if (newUser) {
          const token = jwt.sign({ email }, process.env.JWT_SECRET);
          return({status:201,json: {message: "account created", token}})
        }
      }
    } else {
      return({status:400, json: {message: "the email and or password you provided are either missing or inadequate in nature"}});
    }
  } catch (err) {
    console.log(err);
    return({status:500,json:{message:"server error", error: err}});
  }
}

const login = async ({email,password}) => {
  try {
    const [user] = await db("Users").where("Email",email);
    if (user?.Password) {
      const authenticated = bcrypt.compareSync(password,user.Password);
      if (authenticated) {
        const token = jwt.sign({email}, process.env.JWT_SECRET);
        return({status:200,json:{message:"you are now logged in", token}})
      } else {
        return({status:401,json:{message:"incorrect username and/or password"}});
      }
    }
  } catch (err) {
    console.log(err);
    return({status:500,json:{message:"server error", error: err}});
  }
}

const getFavorites = async (token) => {
  const {email} = jwt.verify(token,process.env.JWT_SECRET);
  const favorites = await db("Users").where({email}).join("User_Favorites").where("User_Favorites.User_ID","Users.ID").join("Favorites").where("Favorites.ID","User_Favorites.Favorite_ID");
  if (favorites) { 
    return({status:200,json:{favorites}});
  } else {
    return({status:500,json:{message:"unable to retrieve your favorites from the database"}})
  }
}

const addFavorite = async (token,queryString) => {
  try {
    const { email } = jwt.verify(token,process.env.JWT_SECRET);
    if (isEmail(email)) {
      const addFavorite = await db.transaction(async (trx) => {
        const [user] = await db("Users").transacting(trx).where("Email",email);
        if (Number.isInteger(parseInt(user.ID))) {
          await db("Favorites").transacting(trx).insert(queryString).onConflict().ignore();
          const [favorite] = db("Favorites").transacting(trx).where("QueryString",queryString);
          if (favorite) {
            const bridge = await db("User_Favorites").transacting(trx).insert({"User_ID": user.ID, "Favorite_ID": favorite.ID}).onConflict().merge();
            return bridge;
          } else { throw "server error"; }
        } else { throw "server error" }
      });
      if (addFavorite) {
        return ({status:201,message:"favorite added"})
      } else {
        return({status:500,message:"server error"})
      }
    }
    else {
      return({status:401,message:"unauthoorized"})
    }
  } catch (err) {
    return ({status:500, json: {message: "server error", error: err}});
  }
}

const removeFavorite = async (token,queryString) => {
  return({status:200, json: {message:"removed"}});
}

module.exports = {signup, login, getFavorites, addFavorite, removeFavorite}