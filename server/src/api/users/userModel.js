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
          return({status:200,json: {message: "account created", token}})
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

module.exports = {signup, login}