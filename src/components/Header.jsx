import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import  AuthContext  from '../context/AuthContext';
const Header = () => {
  const linkstyle = {
    textDecoration: 'none',
    color: 'white'
  }
  let {user, logoutUser } = useContext(AuthContext)
  return (
    <div>
        <Link to="/" style={linkstyle}>Home</Link>
        <span style={{color : 'white'}}> | </span>
        {user ? (
          <button onClick={logoutUser} style={linkstyle} >Logout</button>
        ): (
          <Link to="/login" style={linkstyle}>Login</Link>
        )}
        {user && <p style = {linkstyle} > Hello {user.username}</p>}
        
    </div>
  )
}

export default Header
