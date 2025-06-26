import React, {useState, useEffect} from 'react'

const Chat = ({socket}) => {
    const token = localStorage.getItem("token")
    const [message, setmessage] = useState("")
    const [allmessage, setallmessage] = useState([])
   
    useEffect(() => {
      socket.emit("authenticate", token )
    }, [])
    

    const Send = ()=>{
        socket.emit("sendmessage",message)
    }

    socket.on("receivemessage",(message)=>{
       console.log(message);
       setallmessage([...allmessage, message])
    })
    socket.on("getallmessage",(allchat)=>{
      setallmessage(allchat)
    })
  return (
    <div>
        <input onChange={(e)=>setmessage(e.target.value)} type="text" />
        <button onClick={Send}>Send message</button>

        {
            allmessage.map((el)=>(
                <>
                <h1 style={{padding:"10px, 40px",backgroundColor:"blue"}}>{el.message}</h1>
                </>
            ))
        }
    </div>
  )
}

export default Chat