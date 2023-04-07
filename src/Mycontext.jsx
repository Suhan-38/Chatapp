import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { auth } from '../src/components/Firebase/Config'
import { onAuthStateChanged } from 'firebase/auth'
export const usercontext = createContext();
const Mycontext = ({ children }) => {
    const [user, setuser] = useState();
    const[chatclass,setchatclass]=useState("chat displayname")
    const[sidebarclass,setsidebarclass]=useState("side-bar")
    useEffect(()=>{
        let unsubscribe=onAuthStateChanged(auth,(currentuser)=>{
            setuser(currentuser);
        })
        return ()=>{
            unsubscribe();
        }
    },[])


    return (
        <usercontext.Provider value={{ user, setuser,chatclass,setchatclass,sidebarclass,setsidebarclass }}>
            {children}
        </usercontext.Provider>
    )
}

export default Mycontext
