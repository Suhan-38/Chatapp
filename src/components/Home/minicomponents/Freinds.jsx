import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext,useState,useEffect } from 'react'
import { ChatContext } from '../../../ChatContext';
import { usercontext } from '../../../Mycontext';
import { db } from '../../Firebase/Config';
import "./Freinds.css"
const Freinds = () => {
  const [chats, setChats] = useState([]);

  const { user,chatclass,setchatclass,setsidebarclass } = useContext(usercontext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    user.uid && getChats();
  }, [user.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setchatclass("chat");
    setsidebarclass("side-bar displaynone")

  };
  return (
    <div className="friend-list">
      {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="friend-recent"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" className='profile-pic pic-lg' />
          <div className="userChatInfo">
            <span className='m-text'>{chat[1].userInfo.displayName}</span>
            <p className='recent-message'>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Freinds



{/* <div className='friend-recent'>
        <img src='https://tse1.mm.bing.net/th?id=OIP.PVgBLHFQgbzOXXjc0UVD_gHaHa&pid=Api&P=0' className='profile-pic pic-lg' alt='profilepic'/>
        <div className='recent-detail'>
            <span className='m-text'>Shreyas</span>
            <span className='recent-message'>Okey thank you</span>
        </div>
        
      </div> */}