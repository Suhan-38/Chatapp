import React, { useContext, useEffect, useRef,useState } from "react";
import { ChatContext } from "../../../ChatContext";
import { usercontext } from "../../../Mycontext";
import { doc, onSnapshot } from "firebase/firestore";

import "./Message.css"
import { db } from "../../Firebase/Config";
const Message = () => {
    const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const  { user }=useContext(usercontext);
  const ref=useRef();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages)

    return (
        <div className='Message'>
            {messages.map((message) => (
                <div ref={ref}
                className={message.senderId === user.uid? "my-message": "public-message"}>
                          <div className='identity'>
                              <img src={message.senderId === user.uid? user.photoURL: data.userm.photoURL
                    } className='profile-pic pic-lg' alt="profilepic" />
                              <span className='recent-message'>Just now</span>
                          </div>
                          <div className={message.senderId === user.uid? "text-content": "public-text-content"}>
                              {message.img && <img src={message.img}alt="" className="pic-lga" />}
                              <p style={{textAlign: "end"}}>{message.text}</p>
                          </div>
                          </div>
                          ))}
      </div>
            
            )

                }
            export default Message;
