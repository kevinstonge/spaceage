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
  return await db("Users").where("Email", email).join("User_Favorites", "User_Favorites.User_ID","=","Users.ID").join("Favorites", "Favorites.ID","=","User_Favorites.Favorite_ID").select("Favorites.QueryString")
    .then(r=>{
      return({status:200,json:{favorites: r.map((f)=>f.QueryString)}});
    })
    .catch(e=>{
      return({status:500,json:{message:"unable to retrieve your favorites from the database", error: e}})
    });
}

const addFavorite = async (token,queryString) => {
  try {
    const { email } = jwt.verify(token,process.env.JWT_SECRET);
    if (isEmail(email)) {
      return await db.transaction(async (trx) => {
        const [user] = await db("Users").transacting(trx).where("Email",email);
        if (Number.isInteger(parseInt(user.ID))) {
          await db("Favorites").transacting(trx).insert({"QueryString": queryString}).onConflict("QueryString").ignore();
          const [favorite] = await db("Favorites").transacting(trx).where("QueryString",queryString);
          if (favorite) {
            await db("User_Favorites").transacting(trx).insert({"User_ID": user.ID, "Favorite_ID": favorite.ID});
          } else { throw "failed to create favorite"; }
        } else { throw "failed to identify user" }
      })
      .then((r)=>{
        return({status:201, message: "favorite added"});
      })
      .catch(e=>{
        return({status:500,message:"database transaction error", error: e});
      });
    }
    else {
      return({status:401,message:"unauthorized"})
    }
  } catch (err) {
    return ({status:500, json: {message: "server error", error: err}});
  }
}

const removeFavorite = async (token,queryString) => {
  try {
    const { email } = jwt.verify(token,process.env.JWT_SECRET);
    if (isEmail(email) && queryString) {
      const [userID] = await db("Users").select("ID").where("Email",email);
      const [favoriteID] = await db("Favorites").select("ID").where("QueryString",queryString);
      console.log(userID);
      if (userID && favoriteID) {
        return await db("User_Favorites").del(['User_ID','Favorite_ID']).where("User_ID",userID.ID).andWhere("Favorite_ID",favoriteID.ID)
          .then(r=>{
            console.log('then');
            return({status:200, json: {message: "deleted"}});
          })
          .catch(e=>{
            console.log(e);
            return({status:500, message: "error deleting favoritge", error: e});
          });
      } else { return ({status:500, message: "error identifying user or favorite"})
      }
    }
    else {
      return({status:401, json: {message: "unauthorized or bad request"}});
    }
  } catch (err) {
    return ({status:500, json: {message: "server error", error: err}});
  }
}

module.exports = {signup, login, getFavorites, addFavorite, removeFavorite}