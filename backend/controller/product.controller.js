const productmodel = require("../model/product.model")
const cloudinary = require("../utils/cloudinary")
const slugify = require("slugify")

const AddProduct = async (req, res) =>{
    try {
      console.log(req.body);
     const {productName, productPrice, productDescription, productImage,stock} = req.body
     if (!productName || !productPrice || !productDescription || !productImage || !stock) {
        return res.status(400).send({message:"All fields are mandatory", status:false})
     }
      
     const imageurl = await cloudinary.uploader.upload(productImage)
     console.log(imageurl.secure_url);
     if (!imageurl) {
        return res.status(406).send({message:"Unable to upload Image", status:false})  
     }
     const slug = await slugify(productName, {
        replacement: '_',  // replace spaces with replacement character, defaults to `-`
        lower: true,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
      })

      const createdProduct =   await productmodel.create({
        productName,
        productPrice,
        productDescription,
        productImage:imageurl.secure_url,
        stock,
        productSlug:slug
      })

      if (!createdProduct) {
        return res.status(406).send({message:"Unable to upload product", status:false})  
    
      }
      return res.status(200).send({message:"product Uploaded successfully", status:true})  
      
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:error.message, status:false})  
        
    }
}

module.exports = {AddProduct}