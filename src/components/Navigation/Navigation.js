import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Import stylów CSS dla nawigacji

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="navbar-center">
        <ul className="navbar-links">
          <li>
            <Link to="/login" className="nav-link">Login</Link>
            </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
