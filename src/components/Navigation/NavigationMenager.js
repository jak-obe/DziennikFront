import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Import stylów CSS dla nawigacji
import NavigationAdmin from './NavigationAdmin';
import NavigationStudent from './NavigationStudent';

const NavigationMenager = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await fetch('/Users'); // Endpoint do sprawdzenia danych użytkownika
        if (response.ok) {
          setIsAdmin(true);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        // console.error('Error checking user role:', error.message);
      }
    };

    checkUserRole();
  }, []);



  if (isAdmin) {
    return <NavigationAdmin/>;
  }else{
    return <NavigationStudent/>;
  }
};

export default NavigationMenager;
