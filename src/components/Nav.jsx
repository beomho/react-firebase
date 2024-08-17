import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <>
    <h2>Navigation</h2>
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
        </ul>
    </nav>
    </>
  )
}

export default Nav