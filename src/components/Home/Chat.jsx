import React, { useContext, useState } from 'react'
import "./Chat.css"
import Chatnavbar from './chatcomponents/Chatnavbar'
import Bottomsearch from './chatcomponents/Bottomsearch'
import Message from './chatcomponents/Message'
import { usercontext } from "../../Mycontext";
const Chat = () => {
  const {chatclass,setchatclass}=useContext(usercontext);
  console.log(chatclass);
  return (
    <div className={chatclass}>
      <Chatnavbar />
      <Message />
      <Bottomsearch />
    </div>
  )
}

export default Chat
