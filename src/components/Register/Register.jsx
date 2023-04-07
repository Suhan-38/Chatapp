import React, { useState } from 'react'
import "./Register.css"
import { Link } from 'react-router-dom'
import { auth } from '../Firebase/Config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage,db } from '../Firebase/Config'
import { updateProfile } from 'firebase/auth'
import { collection, addDoc,setDoc,doc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom'

const  Register  = () => {
    let Navigate=useNavigate();
    const[error,seterror]=useState("");
    const handleregister=async(e)=>{
        e.preventDefault();
        let displayName=e.target[0].value;
        let password=e.target[2].value;
        let email=e.target[1].value
        let response=await createUserWithEmailAndPassword(auth,email,password);
        const date=new Date().getTime();
        const storageRef = ref(storage, `${displayName+date}`);
        const uploadTask = uploadBytesResumable(storageRef, e.target[3].files[0]);
        
        uploadTask.on(
  
  (error) => {
    console.log(error);
  }, 
  async() => {
    await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await updateProfile(response.user,{
            displayName,
            photoURL: downloadURL,
        })
        try {
            const docRef = await setDoc(doc(db, "users", response.user.uid), {
              displayName,
              email,photoURL: downloadURL,
              userid: response.user.uid
            });
            await setDoc(doc(db, "userChats", response.user.uid), {});
            Navigate("/Home");
          } catch (e) {
            seterror(e);
            console.error("Error adding document: ", e);
          }
    });
  }
  
);

        

    }
  return (
    <div className='login-section'>
      <h2>Welcome to Soo chat</h2>
            <div className='Login-container'>
                <div className='heading'>
                    <h2>Soo chat</h2>
                    <img src='https://tse3.mm.bing.net/th?id=OIP.REFG91LCSSfhp4FWz53-lwHaHa&pid=Api&P=0' className='logo-img'/>
                    <p>Login</p>
                </div>
                <div className='Login-form'>
                    <form onSubmit={handleregister}>
                        <input type="text" placeholder='name' name='name'/>
                        <input type="email" placeholder='email'name='email' />
                        <input type="password" placeholder='password' />
                        <label htmlFor='file' id='file-label'>
                            <img src='https://tse4.mm.bing.net/th?id=OIP.djrHhPrOVynppSdGJ2dtPgHaHa&pid=Api&P=0' width="40px"/>
                            <span>Select your avatar</span>
                        </label>
                        <input type="file"  id='file' style={{display: "none"}}/>
                        <button type='submit' className='login-button'>Register</button>
                    </form>
                    <p>{error}</p>
                    <p className='small-text'>You do not have account? <Link to={'/Login'}>Login</Link></p>
                </div>
            </div>
        </div>
  )
}

export default Register
