const usermodel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const SaltRound = 10
const sendConfirmationEmail = require("../utils/mailer")


const userSignup =async (req, res) =>{
  try {
    console.log(req.body);
    const {username, email, password} = req.body
    if (!username || !email || !password) {
        return res.status(400).send({message:"All fields are mandatory", status:false})
    }
      const hashedPassword = await bcrypt.hash(password, SaltRound)
      
      const mail = await sendConfirmationEmail(username, email)
      if (!mail) {
        return res.status(402).send({message:"Email Provided is not Valid", status:false})
        
      }
     const createduser =  await usermodel.create({
      username,
      email,
      password:hashedPassword
     })
      console.log(createduser);
      if (createduser) {
        return res.status(200).send({message:"user created successfully", status:true}) 
      }
  } catch (error) {
    console.log(error.code);
    if (error.code == 11000) {
        if (error.message.includes(" index: email_1 dup key:")) {
            return res.status(500).send({message:"User already exist", status:false})
        }
    }
   
    return res.status(500).send({message:error.message, status:false})
    
  }
}

const userLogin = async (req, res) =>{
  try {
    console.log(req.body);
    const {email, password} = req.body
    if (!email || !password) {
      return res.status(400).send({message:"All fields are mandatory", status:false})
      
    }
   const existuser =  await usermodel.findOne({email})
   console.log(existuser);
   
  const comparePassword = await bcrypt.compare(password, existuser.password)
     console.log(comparePassword);
     
   if (existuser && comparePassword) {
     const token =  await jwt.sign({email}, process.env.SECRETKEY, {expiresIn:60})
     console.log(token);
     
    return res.status(200).send({message:"user login successful", status:true, token}) 
      
   }
   return res.status(406).send({message:"Invalid User", status:false})

  } catch (error) {
    return res.status(500).send({message:error.message, status:false})
  }
}

const verifyToken = async (req, res) =>{
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(400).send({message:"Invalid token", status:false})
      
    }
   const verified =  await jwt.verify(token, process.env.SECRETKEY)
   console.log(verified);
   
   if (!verified) {
    return res.status(400).send({message:"token verification failed", status:false})
     
   }
   return res.status(200).send({message:"token verified", status:true, email:verified?.email }) 
   
     
  } catch (error) {
    return res.status(500).send({message:error.message, status:false})
    
  }
}
module.exports = {userSignup, userLogin,verifyToken }