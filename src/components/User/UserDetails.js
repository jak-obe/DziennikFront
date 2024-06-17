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
  const [expanded, setExpanded] = useState(false); // Stan do przechowywania informacji, czy szczegóły są rozwinięte

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

    if (expanded) {
      fetchUserDetails();
    }
  }, [id, expanded]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="userDetails">
      <button className="userDetails__button" onClick={toggleExpand}>
        <div className="userDetails__roles">
          {roles.$values.map((role, index) => (
            <span key={index} className={`userDetails__role userDetails__role-${role}`}>{role}</span>
          ))}
        </div>
        <span className="userDetails__name">{firstName} {lastName}</span>
      </button>
      {expanded && (
        <div className="userDetails__details">
          {detailedInfo ? (
            <>
              <p><strong>Id int:</strong> {$id}</p>
              <p><strong>Id long:</strong> {id}</p>
              <p><strong>Email:</strong> {email}</p>
              {/* Dodaj inne szczegółowe informacje, jeśli potrzebne */}
            </>
          ) : (
            <p>Loading...</p>
          )}
          {error && <p className="error">Error: {error.message}</p>}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
