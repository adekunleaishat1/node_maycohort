

const getLandingpage = (request, response) =>{
    
        //  response.send("Welcome to your Node class")
        response.render("index",{name:"Shola",gender:"female"})
}

const getSignup = (request, response)=>{
    response.render("signup",{errormessage})
}

module.exports = {getLandingpage,getSignup}
