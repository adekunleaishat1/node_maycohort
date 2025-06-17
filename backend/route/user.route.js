const express = require("express")
const userrouter = express.Router()
const {userSignup, userLogin, verifyToken} = require("../controller/user.controller")


userrouter.post("/signup",userSignup )
userrouter.post("/login",userLogin )
userrouter.get("/verify",verifyToken )



module.exports = userrouter



