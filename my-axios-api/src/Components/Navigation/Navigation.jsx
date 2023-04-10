import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from '../auth/AuthProvider.jsx'
import Logout from "../Login/Logout";
import './Navigation.css'

const Navigation = () => {
    const { isLoggedIn, user } = useContext(AuthContext)

    return (
        <nav className="navigation-nav">
            <Link to="/home">Home</Link>
            {isLoggedIn ?
                <Link ><Logout /></Link>
                :
                <div className="navigation-logout">
                    <Link to="/register">Register</Link>
                    <a> - </a> 
                    <Link to="/login">Login</Link>
                </div>
            }
        </nav>
    );
};
export default Navigation;
