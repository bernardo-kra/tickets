import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthProvider.jsx'
import Logout from "../../Login/Logout"
import './Header.css'

const Header = () => {
  const { isLoggedIn, user } = useContext(AuthContext)
  return (
    <header className="header">
      <div className='header-content not-selectable'>
        <Link to="/">Home</Link>
        {isLoggedIn ?
          <>
            <Link to="my-tickets">My-tickets</Link>
            <Link to="create-tickets">Create-tickets</Link>
            <Link ><Logout /></Link>
          </>
          :
          <div className="navigation-logout">
            <Link to="/register">Register</Link>
            <a> - </a>
            <Link to="/login">Login</Link>
          </div>
        }
      </div>
    </header >
  )
}

export default Header