const mongoose = require("mongoose")

const chatschema = mongoose.Schema({
    message:{type:String, required:true, trim:true},
    sender:{type:String, required:true}
},{timestamp:true})

const chatmodel = mongoose.model("chats", chatschema)

module.exports = chatmodel