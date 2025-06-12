const express = require("express")
const app = express()
require("dotenv").config()
const connect =  require("./Dbconfig/db.connect")
const userrouter = require("./route/user.route")

//middlewares
app.use(express.json())
app.use("/user", userrouter)






connect()
const port = 5007
app.listen(port,()=>{
  console.log(`app started at port ${port}`);
  
})