import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import NavigationExtend from "./NavigationExtend"; // Import stylów CSS dla nawigacji


const NavigationAdmin = () => {
  return (
    <nav className="navbar">
      <div className="navbar-center">
        <ul className="navbar-links">
          <li>
            <Link to="/login" className="nav-link">gowno</Link>
            </li>
            <li>
            <Link to="/useradd" className="nav-link">asdasdasdasdad</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationAdmin;
