import { useState } from 'react';
import { io } from "socket.io-client";

const socket = io();

function App() {

  const [message, setMessage] = useState('')
  const [content, setContent] = useState([])

  socket.on('receiveMessage', (msg)=>{
    console.log("receive: ", msg);
    const newContent = "receive: "+ msg;

    setContent([...content, newContent]);
  }) 

  function sendMessage(){  
    console.log("send: ", message);
  
    const newContent = "send: "+ message;

    setContent([...content, newContent]);
    console.log("content: ", content);
  
    socket.emit('sendMessage', message)
    setMessage('')
  }
 
  return (
    <div className=" w-full h-[100vh] flex  justify-center items-center">
      <div className=' flex flex-col w-1/2 h-96 gap-2 p-5'>
        <div id='message_block' className=' h-80 overflow-auto border rounded-lg w-full'>
          {
            content.map((item, index)=>
              <div key={index}>{item}</div>
            )
          }
        </div>
        <input type="text" placeholder='type message' name='message' value={message} onChange={(e)=>setMessage(e.target.value)} className=' border rounded-md p-1 w-full'/>
        <button onClick={()=>sendMessage()} className=' w-full p-1 border rounded-lg bg-blue-600 font-semibold text-white hover:bg-white hover:text-blue-600 hover:border-blue-600 hover:border-[1px]'>SEND</button>
      </div>
    </div>
  )
}

export default App
