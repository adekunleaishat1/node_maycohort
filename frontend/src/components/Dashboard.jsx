import React,{useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
   const token = localStorage.getItem("token")
   const navigate = useNavigate()
    useEffect(() => {
      axios.get("http://localhost:5007/user/verify",{
        "headers":{
            "Authorization":`bearer ${token}`
        }
      }).then((res)=>{
        console.log(res);
        
      }).catch((err)=>{
        console.log(err);
        if (err?.response?.data?.message == "jwt expired") {
            navigate("/login")
        }
        
      })
    }, [])
    
  return (
    <div>
        <h1>Welcome to Your Dashboard</h1>
    </div>
  )
}

export default Dashboard