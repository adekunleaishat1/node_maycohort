const express = require("express")
const app = express()
require("dotenv").config()
const connect =  require("./Dbconfig/db.connect")
const userrouter = require("./route/user.route")
const cors = require("cors")
const productrouter = require("./route/product.route")
const socket = require("socket.io")
const chatmodel = require("./model/chatmodel")
const jwt = require("jsonwebtoken")

//middlewares
app.use(cors({origin:"*"}))
app.use(express.json({extended:true, limit:"50mb"}))
app.use("/user", userrouter)
app.use("/product", productrouter)






connect()
const port = 5007
const connection = app.listen(port,()=>{
  console.log(`app started at port ${port}`);
  
})

const io = socket(connection,{
  cors:({origin:"*"})
})

io.on("connection", async (socket)=>{
  console.log("A user connection");

  let email ;
   const allchat = await chatmodel.find()
   socket.emit("getallmessage",allchat )
  socket.on("authenticate",async (token)=>{
   try {
     // console.log(token);
     const user = await jwt.verify(token, process.env.SECRETKEY)
     console.log(user);
     if (user) {
      email = user.email
     }

   } catch (error) {
    console.log(error);
    
   }
  })
  socket.on("sendmessage",async (message)=>{
    const createdChat = await chatmodel.create({
      message,
      sender:email
     })
     socket.emit("receivemessage", {message, sender:email })
  })

})