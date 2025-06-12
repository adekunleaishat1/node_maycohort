const express = require("express")
const userrouter = express.Router()
const {userSignup} = require("../controller/user.controller")


userrouter.post("/signup",userSignup )



module.exports = userrouter



