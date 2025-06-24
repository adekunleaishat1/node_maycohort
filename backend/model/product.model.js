const mongoose = require("mongoose")

const productschema = mongoose.Schema({
    productName:{type:String, required:true, trim:true},
    productDescription:{type:String, required:true, trim:true},
    productPrice:{type:Number, required:true, trim:true},
    productImage:{type:String, required:true, trim:true},
    productSlug:{type:String, required:true, trim:true, unique:true},
    stock:{type:Number, default:0 , required:true}
},{timestamp:true})


const productmodel = mongoose.model("products", productschema)

module.exports = productmodel