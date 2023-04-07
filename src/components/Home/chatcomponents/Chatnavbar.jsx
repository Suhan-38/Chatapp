import React, { useContext } from 'react'
import "./Chatnavbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faUserPlus,faEllipsis,faCircleArrowLeft
 } from '@fortawesome/free-solid-svg-icons'
import { usercontext } from '../../../Mycontext'
import { ChatContext } from '../../../ChatContext'

const Chatnavbar = () => {
    const{data}=useContext(ChatContext);
    const { user,chatclass,setchatclass,setsidebarclass } = useContext(usercontext);
    return (
        <div className='chat-nav'>
            <FontAwesomeIcon icon={faCircleArrowLeft}  style={{fontSize: "24px"}} onClick={()=>{
                    setchatclass("chat displayname");
                    setsidebarclass("side-bar");
            }} className='backid'/>
            <span>{data.userm.displayName}</span>
            <div className='chat-icons'>
                <FontAwesomeIcon icon={faVideo} />
                <FontAwesomeIcon icon={faUserPlus} />
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
        </div>
    )
}

export default Chatnavbar
