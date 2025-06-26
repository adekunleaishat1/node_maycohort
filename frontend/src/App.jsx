import React ,{useRef} from 'react'
import {Route, Routes} from "react-router-dom"
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import socketClient from "socket.io-client"
import Chat from './components/Chat'

const App = () => {
  const endpiont = "http://localhost:5007"
   const socket = useRef(socketClient(endpiont))
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/chat' element={<Chat socket={socket.current}/>}/>
      </Routes>
      
    </div>
  )
}

export default App