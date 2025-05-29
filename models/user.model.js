const mongoose = require("mongoose")

const userschema = mongoose.Schema({
     username:{type:String,required:true,trim:true},
     email:{type:String,required:true,trim:true,unique:true},
     password:{type:String,required:true,trim:true}
})
const usermodel = mongoose.model("user_collection",  userschema)


module.exports = usermodel