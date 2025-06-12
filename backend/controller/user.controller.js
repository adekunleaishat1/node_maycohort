const usermodel = require("../model/user.model")

const userSignup =async (req, res) =>{
  try {
    console.log(req.body);
    const {username, email, password} = req.body
    if (!username || !email || !password) {
        return res.status(400).send({message:"All fields are mandatory", status:false})
    }
     const createduser =  await usermodel.create(req.body)
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


module.exports = {userSignup}