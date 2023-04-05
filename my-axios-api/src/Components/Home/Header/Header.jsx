import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
      <header className="header">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tickets">Tickets</Link>
            </li>
            <li>
              <Link to="/eventos">Eventos</Link>
            </li>
            <li>
              <Link to="/sobre-nos">Sobre nós</Link>
            </li>
            <li className="right">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  };

  export default Header