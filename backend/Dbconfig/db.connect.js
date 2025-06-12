const mongoose = require("mongoose")

const connect = async() =>{
    try {
     const connection =  await mongoose.connect(process.env.MONGO_URI)
     if (connection) {
        console.log("connected to database");
        
     }
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connect

