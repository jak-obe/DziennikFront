import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Import stylów CSS dla nawigacji

const NavigationAdmin = () => {
    const [unloged, setUnloged] = useState(false);
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/Account/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Możesz dodać dodatkowe nagłówki, jeśli są wymagane
        },
        // Możesz dodać ciało zapytania, jeśli jest wymagane
      });

      if (response.ok) {
        setUnloged(true);
        
      }

      // Tutaj możesz dodać logikę po wylogowaniu, np. przekierowanie użytkownika
      // na stronę logowania lub zmiana stanu aplikacji.

      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error.message);
      // Obsługa błędu, np. wyświetlenie komunikatu użytkownikowi
    }
  };

  if (unloged) {
    return <Navigate replace to="/login" />;
  } 
else {

  return (
    <nav className="navbar">
      <div className="navbar-center">
        <ul className="navbar-links">
          <li>
            <Link to="/profile" className="nav-link">Profile</Link>
          </li>
          <li>
            <Link to="/allusers" className="nav-link">AllUsers</Link>
          </li>
          <li>
            <Link  to="/useradd" className="nav-link">Add User</Link>
          </li>
          <li>
            <Link  to="/classadd" className="nav-link">AddClass</Link>
          </li>
          <li>
            <Link  to="/subjectadd" className="nav-link">AddSubject</Link>
          </li>
          <li>
            <Link to="/planlekcji" className="nav-link">Plan</Link>
          </li>
          <li>
            <button className="nav-button" onClick={handleLogout}>Logout</button>
          </li>

        </ul>
      </div>
    </nav>
  );
}
};

export default NavigationAdmin;
