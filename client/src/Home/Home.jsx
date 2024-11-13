import React from 'react'
import {  NavLink } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div>
        <h1>Shaheen Bagh School</h1>
        <h2>Time Table Generator</h2>
        <nav>
        <NavLink className="nav-item" to="/Teacher">Teacher</NavLink>
        <NavLink className="nav-item" to="/Class">Class</NavLink>
        </nav>
    </div>
  )
}

export default Home