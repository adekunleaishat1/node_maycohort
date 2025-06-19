import React ,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const naviagate = useNavigate()
    const [userdetail, setuserdetails] = useState({
        email:"",
        password:""
    })
    const HandleInputchange = (e) =>{
       setuserdetails({...userdetail, [e.target.name]:e.target.value})
    }
    
    const Register = () =>{
        console.log(userdetail);
        
        axios.post("http://localhost:5007/user/login",userdetail)
        .then((res)=>{
            console.log(res);
            if (res.data) {
                localStorage.setItem("token", res.data.token)
                naviagate("/dashboard")
            }
            
        }).catch((err)=>{
            console.log(err);
            
        })
    }
  return (
    <div>
        <input onChange={HandleInputchange} type="text" name='email' placeholder='Email' />
        <input onChange={HandleInputchange} type="text" name='password' placeholder='Password' />
        <button onClick={Register}>login</button>
    </div>
  )
}

export default Login