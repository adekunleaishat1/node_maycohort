const express = require("express")
const app = express()
require("ejs")


app.set("view engine", "ejs")
app.use(express.urlencoded())

let userarray = []
let todos = []
// CRUD CREATE READ UPDATE AND DELETE
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

app.post("/user/signup",(request, response)=>{
   console.log(request.body);
   userarray.push(request.body)
   console.log(userarray);
   response.redirect("/login")
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

const port = 5005

app.listen(port,()=>{
   console.log("app started");
   
})