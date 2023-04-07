import { ref } from 'firebase/storage';
import React, { useContext,useState } from 'react'
import { usercontext } from '../../../Mycontext';
import { ChatContext } from '../../../ChatContext';
import { useRef } from 'react';
import "./Bottomsearch.css"
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { v4 as uuid } from "uuid";
import { getDownloadURL,uploadBytesResumable } from "firebase/storage";
import { db, storage } from '../../Firebase/Config';
const Bottomsearch = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { user } = useContext(usercontext);
  const { data } = useContext(ChatContext);
  const useref=useRef();
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      if (uploadTask){
      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL);
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
      }
    } 
    else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.userm.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
    useref.current.value=null;
  };
  return (
    <div className='Bottomsearch'>
       <input type="text" placeholder='enter message' className='chat-input' onChange={(e) => setText(e.target.value)} value={text} />
       <div className='bottom-side-div'><label htmlFor='input-type-file'>
        <img src='https://cdn.onlinewebfonts.com/svg/img_234957.png' style={{width: "20px"}}/>
       </label>
       <input type="file" id='input-type-file' ref={useref} style={{display: "none"}} multiple={false} onChange={(e) =>{setImg(e.target.files[0]?e.target.files[0]:e.target.files[1])}} />
       <button className='bottom-button' onClick={handleSend} >Send</button>
       </div>
    </div>
  )
}

export default Bottomsearch
