import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from '../auth/AuthProvider.jsx'
import Logout from "../Login/Logout";
import './Navigation.css'
import Header from "../Home/Header/Header.jsx";

const Navigation = () => {

    return (
        <nav className="navigation-nav">
            <Header />
        </nav>
    );
};
export default Navigation;
