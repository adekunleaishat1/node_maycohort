import React ,{useState}from 'react'
import axios from "axios"

const Signup = () => {
    const [userdetail, setuserdetails] = useState({
        username:"",
        email:"",
        password:""
    })
    const HandleInputchange = (e) =>{
       setuserdetails({...userdetail, [e.target.name]:e.target.value})
    }
    const Register = () =>{
        console.log(userdetail);
        
        axios.post("http://localhost:5007/user/signup",userdetail)
        .then((res)=>{
            console.log(res);
            
        }).catch((err)=>{
            console.log(err);
            
        })
    }
  return (
    <div>
        <input onChange={HandleInputchange} type="text" name='username' placeholder='Username'/>
        <input onChange={HandleInputchange} type="text" name='email' placeholder='Email' />
        <input onChange={HandleInputchange} type="text" name='password' placeholder='Password' />
        <button onClick={Register}>Sign Up</button>
    </div>
  )
}

export default Signup