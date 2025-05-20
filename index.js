const express = require("express")
const app = express()
require("ejs")
const mongoose = require("mongoose")


app.set("view engine", "ejs")
app.use(express.urlencoded())

let userarray = []
let todos = []
// CRUD CREATE READ UPDATE AND DELETE

const userschema = mongoose.Schema({
     username:{type:String},
     email:{type:String},
     password:{type:String}
})

const usermodel = mongoose.model("user_collection",  userschema )


app.get("/",(request, response)=>{
    //  response.send("Welcome to your Node class")
    response.render("index",{name:"Shola",gender:"female"})
})

app.get("/user",(request, response)=>{
 response.json({
    user:[
        {name:"Lola", class:"React"},
        {name:"Shola", class:"Node"},
        {name:"tobi", class:"Angular"}
    ]
 })
})
app.get("/signup",(request, response)=>{
   response.render("signup")
})
app.get("/login",(req, res)=>{
    res.render("login")
})
app.get("/todo", (req, res)=>{
   res.render("todo", {todos})
})
app.get("/todo/edit/:index", (req, res)=>{
   console.log(req.params);
   const indexToEdit = req.params.index
   const oneTodo = todos[indexToEdit]
   console.log(todos[indexToEdit]); 
   res.render("edit", {oneTodo, indexToEdit})
   
})

app.post("/update/todo/:index",(req, res)=>{
      const index = req.params.index
      const {title, description} = req.body
      console.log(req.body);
      let one = "hdhyh"
      one = "jje"
      todos[index] = {title, description}
      res.redirect("/todo")
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
   // response.redirect("/login")
  } catch (error) {
   console.log(error);
   
  }
})

app.post("/user/login",(request, response)=>{
 console.log(request.body);
 const existuser = userarray.find((user)=> user.email == request.body.email )
 console.log(existuser);
 if (existuser && existuser.password == request.body.password) {
   console.log("login successful");
   response.redirect("/")
 }else{
    console.log("invalid user");
    response.redirect("/login")
    
 }
})

app.post("/user/todo",(req, res)=>{
   console.log(req.body);
   todos.push(req.body)
   res.redirect("/todo")
})

app.post("/todo/delete",(req, res)=>{
   // console.log(req.body);
   const {index} = req.body
   console.log(index);
   todos.splice(index, 1)
   res.redirect("/todo")
   
})
// app.post("/edit", (req, res))

const port = 5005

app.listen(port,()=>{
   console.log("app started");
   
})

const uri = "mongodb+srv://aishatadekunle877:aishat@cluster0.t92x8pf.mongodb.net/Maycohort?retryWrites=true&w=majority&appName=Cluster0"



const connect = async () =>{
   try {
    const connection = await mongoose.connect(uri)
    if (connection) {
      console.log("database connected successfully");
      
    }
   } catch (error) {
      console.log(error);  
   }
}

connect()