const express = require("express")
const app = express()
require("dotenv").config()
const connect =  require("./Dbconfig/db.connect")
const userrouter = require("./route/user.route")
const cors = require("cors")
const productrouter = require("./route/product.route")

//middlewares
app.use(cors({origin:"*"}))
app.use(express.json({extended:true, limit:"50mb"}))
app.use("/user", userrouter)
app.use("/product", productrouter)






connect()
const port = 5007
app.listen(port,()=>{
  console.log(`app started at port ${port}`);
  
})