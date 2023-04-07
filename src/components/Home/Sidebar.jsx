import React, { useState } from 'react'
import "./Sidebar.css"
import Freinds from './minicomponents/Freinds'
import { auth } from '../Firebase/Config'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Mycontext from '../../Mycontext';
import { useContext } from 'react'
import { usercontext } from '../../Mycontext'
import { collection, query, where,getDocs, getDoc, setDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from '../Firebase/Config'

const Sidebar = () => {
  let navigate = useNavigate();
  const { user, setuser,sidebarclass} = useContext(usercontext);
  const [username, setusername] = useState("");
  const [searchdata, setsearchdata] = useState(null);
  const citiesRef = collection(db, "users");
  const handlekey = async (key) => {
    if (key.code !== "Enter") return
    else{
    const q = query(citiesRef, where("displayName", "==", username));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setsearchdata(doc.data());
    });
  }
  
  }
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      user.uid > searchdata.userid
        ? user.uid + searchdata.userid
        : searchdata.userid + user.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: searchdata.userid,
            displayName: searchdata.displayName,
            photoURL: searchdata.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", searchdata.userid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    setsearchdata(null);
    setusername("")
  };
  return (
    <div className={sidebarclass}>
      <div className='sidebar-nav'>
        <h2>Soo Chat</h2>
        <div className='side-right-div'>
          <img src={user.photoURL} className="profile-pic" />
          <span className='profile-name'>{user.displayName}</span>
          <button className='side-logout' onClick={() => { signOut(auth); navigate("/Login") }}>Logout</button>
        </div>
      </div>
      <div className='search-bar'>
        <input type="text" placeholder='Find a user' onChange={(e) => {setusername(e.target.value)}} onKeyDown={handlekey} id='finduser'/>
      </div>
      {searchdata && <div className='friend-recent' onClick={handleSelect}>
        <img src={searchdata.photoURL} className='profile-pic pic-lg' alt='profilepic' />
        <div className='recent-detail'>
          <span className='m-text'>{searchdata.displayName}</span>
        </div>
      </div>}
        <Freinds />

      </div>
      )
    }
      export default Sidebar
