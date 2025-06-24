const express = require("express")
const productrouter = express.Router()
const {AddProduct} = require("../controller/product.controller")

productrouter.post("/upload", AddProduct)


module.exports = productrouter