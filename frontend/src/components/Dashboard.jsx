import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
  const [productDetail, setproductDetail] = useState({
    productName:"",
    productPrice:"",
    productDescription:"",
    productImage:"",
    stock:""
  })
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
    
    const handlefilechange =(e)=>{
      const imagefile = e.target.files[0]
       const reader = new FileReader()
       reader.onload =(e) =>{
          console.log(e.target.result);
          setproductDetail({...productDetail,productImage:e.target.result })
       } 
       reader.readAsDataURL(imagefile)
     
    }

    const handleInputchange = (e) =>{
      const name = e.target.name
      setproductDetail({...productDetail, [name]:e.target.value})
    }

     const Upload = async () =>{
      try {
        console.log(productDetail);
        const response = await axios.post("http://localhost:5007/product/upload",productDetail)
         console.log(response);
         
      } catch (error) {
        console.log(error);
        
      }
     }

  return (
    <div>
        <h1>Welcome to Your Dashboard</h1>
        
        <div>
          <input name="productName" onChange={handleInputchange} type="text" placeholder='ProductName' />
          <input name="productPrice" onChange={handleInputchange} type="text" placeholder='ProductPrice' />
          <input name="productDescription" onChange={handleInputchange} type="text" placeholder='ProductDescription' />
          <input  onChange={handlefilechange} type="file" placeholder='ProductImage' />
          <input name="stock" onChange={handleInputchange} type="text" placeholder='Stock' />
          <button onClick={Upload} >Upload Product</button>
        </div>
    </div>
  )
}

export default Dashboard