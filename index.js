const express = require("express")
const app = express()
require("ejs")
const mongoose = require("mongoose")
require("dotenv").config()
const connect = require("./Dbconfig/Db.connect")
const usermodel = require("./models/user.model")
const userrouter = require("./routes/user.route")


app.set("view engine", "ejs")
app.use(express.urlencoded())
app.use("/",userrouter)

let userarray = []
// let todos = []
let errormessage = ""
// CRUD CREATE READ UPDATE AND DELETE



const todoschema = mongoose.Schema({
   title:{type:String, required:true, trim:true},
   description:{type:String, required:true, trim:true}
})
const todomodel = mongoose.model("todos", todoschema)





app.get("/user",(request, response)=>{
 response.json({
    user:[
        {name:"Lola", class:"React"},
        {name:"Shola", class:"Node"},
        {name:"tobi", class:"Angular"}
    ]
 })
})

app.get("/login",(req, res)=>{
    res.render("login")
})
app.get("/todo", async(req, res)=>{
     try {
      const todos =await todomodel.find()
      console.log(todos);
      
      res.render("todo", {todos})
      
     } catch (error) {
      console.log(error);
      
     }
   
})
app.get("/todo/edit/:id", async(req, res)=>{
  try {
     // console.log(req.params);
   const _id = req.params.id
   console.log(_id);
  const oneTodo =  await todomodel.findOne({_id})
  console.log(oneTodo);

 res.render("edit", {oneTodo, _id})
  } catch (error) {
    console.log(error);
    
  }
   
})

app.post("/update/todo/:id", async(req, res)=>{
     try {
      const {id} = req.params
      const {title, description} = req.body
      console.log(req.body);
    console.log(id);
   //   const newtodo = await todomodel.findByIdAndUpdate(
   //       id,
   //       {title, description}
   //    )

      const newtodo = await todomodel.findOneAndUpdate(
         {_id:id},
         {title, description}
      )
      console.log(newtodo);
      if (newtodo) {
            res.redirect("/todo")
      }
     } catch (error) {
      console.log(error);
      
     }
})
app.get("/edit", (req,res)=>{
   console.log(req.body);
   res.render("edit")
   
})

app.post("/user/signup",async(request, response)=>{
  try {
   console.log(request.body);
   const user =  await usermodel.create(request.body)
    console.log(user);
   response.redirect("/login")
  } catch (error) {
   if (error.message.includes("E11000 duplicate key error")) {
      errormessage = "email already exist"
     return response.redirect("/signup") 
   }
   if (error.message.includes("user_collection validation failed")) {
       errormessage = "All fields are mandatory"
     return response.redirect("/signup")
   }
   console.log(error.message);
   
   response.redirect("/signup")
  }
})


app.post("/user/login",async(request, response)=>{
  try {
   console.log(request.body);
   const {email, password} = request.body
  const existuser =  await usermodel.findOne({email})
  console.log(existuser);
  if (existuser && existuser.password == password) {
    console.log("login succesful");
    response.redirect("/todo")
  }else{
   console.log("user not found");
   response.redirect("/login")
  }
  } catch (error) {
   console.log(error);
   response.redirect("/login")
  }
})


app.post("/user/todo", async (req, res)=>{
   try {
      
      const todos = todomodel.create(req.body)
      // const {title, description} = req.body
      res.redirect("/todo")

   } catch (error) {
      console.log(error);
      
   }
   // console.log(req.body);
   // todos.push(req.body)
   // res.redirect("/todo")
})

app.post("/todo/delete",async(req, res)=>{
 try {
     console.log(req.body);
   const id = req.body.index
  const deletedtodo =  await todomodel.findByIdAndDelete(id)
  if (deletedtodo) {
   res.redirect("/todo")
  }
 
 } catch (error) {
   console.log(error);
 } 
})
// app.post("/edit", (req, res))

const port = 5005

app.listen(port,()=>{
   console.log("app started");
   
})

connect()

