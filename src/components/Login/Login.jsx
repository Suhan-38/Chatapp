import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../Firebase/Config';
import "./Login.css"
const Login = () => {
    let Navigate=useNavigate();
    const[error,seterror]=useState(false);
    const handleLogin=async(e)=>{
        e.preventDefault();
        let password=e.target[1].value;
        let email=e.target[0].value
        try{
        let response=await signInWithEmailAndPassword(auth,email,password);
    }
        catch(e){
            seterror(true)
        }
        Navigate("/Home");
          
  
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
                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder='Email'/>
                        <input type="password" placeholder='Password' />
                        <button type='submit' className='login-button'>Login</button>
                    </form>
                    {error && <p> "something went wrong"</p>}
                    <p className='small-text'>You do not have account? <Link to={'/Register'}>Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login
