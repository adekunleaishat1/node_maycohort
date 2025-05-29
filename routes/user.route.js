const express = require("express")
const userrouter = express.Router()
const {getLandingpage,getSignup} = require("../controllers/user.controller")


userrouter.get("/",getLandingpage)
userrouter.get("/signup", getSignup)


module.exports = userrouter