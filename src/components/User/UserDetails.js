import React, { useState, useEffect } from 'react';
import './UserDetails.css';

const UserDetails = ({
  $id,
  id,
  userName,
  firstName,
  lastName,
  email,
  roles,
}) => {
  const [detailedInfo, setDetailedInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/Users/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDetailedInfo(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <li>
      <div className="userDetails__wrapper">
        <div className="userDetails__divTop">
          <h1>{roles.$values}</h1>
          <h2 className="userDetails__title">
             {firstName} {lastName} <span>({userName})</span>
          </h2>
          <p><strong>Id int:</strong> {$id}</p>
          <p><strong>Id long:</strong> {id}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>
      </div>    </li>
  );
};

export default UserDetails;
