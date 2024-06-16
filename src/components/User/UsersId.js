// src/components/Profile.js

import React, { useState, useEffect } from 'react';
import "./UsersId.css"

const UsersId = ({ id }) => {
  const [user, setUser] = useState(null); // Stan przechowujący dane użytkownika

  useEffect(() => {
    // Symulacja pobierania danych użytkownika z serwera po załadowaniu komponentu
    const fetchUserData = async () => {
      try {
        // Możesz tutaj użyć fetch lub axios do pobrania danych z API
        // Symulacja danych, zastąp tym rzeczywistym zapytaniem HTTP
        const response = await fetch(`Users/me`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        // console.log(userData);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData(); // Wywołanie funkcji pobierającej dane użytkownika
  }, [id]); // Efekt zostanie wywołany ponownie, gdy zmieni się ID użytkownika

  if (!user) {
    return <p>Loading...</p>; // Komunikat ładowania, jeśli dane użytkownika są pobierane
  }

  return (
    <div className="profile-container">
    <h2>User Profile</h2>
    <div>
      <strong>ID:</strong> {user.id}
    </div>
    <div>
      <strong>Username:</strong> {user.userName}
    </div>
    <div>
      <strong>Email:</strong> {user.email}
    </div>
    <div>
      <strong>First Name:</strong> {user.firstName}
    </div>
    <div>
      <strong>Last Name:</strong> {user.lastName}
    </div>
    <div>
      <strong>Phone Number:</strong> {user.phoneNumber ? user.phoneNumber : 'Not provided'}
    </div>
    <div>
      <strong>Email Confirmed:</strong> {user.emailConfirmed ? 'Confirmed' : 'Not Confirmed'}
    </div>
    <div>
      <strong>Phone Number Confirmed:</strong> {user.phoneNumberConfirmed ? 'Confirmed' : 'Not Confirmed'}
    </div>
    <div>
      <strong>Two-Factor Enabled:</strong> {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
    </div>
    <div>
      <strong>Lockout End:</strong> {user.lockoutEnd ? new Date(user.lockoutEnd).toLocaleString() : 'Not locked out'}
    </div>
    <div>
      <strong>Lockout Enabled:</strong> {user.lockoutEnabled ? 'Enabled' : 'Disabled'}
    </div>
    <div>
      <strong>Access Failed Count:</strong> {user.accessFailedCount}
    </div>
  </div>
  );
};

export default UsersId;
