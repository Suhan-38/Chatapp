import React from 'react'
import "./Home.css"
import Sidebar from './Sidebar'
import Chat from './Chat'
const Home = () => {
  return (
    <div className='Home'>
      <div className='Home-container'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home
