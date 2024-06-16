import React, { useState } from 'react';
import './UserDetails.css';

const UserDetails = ({
  id,
  userName,
  email,
  emailConfirmed,
  phoneNumber,
  phoneNumberConfirmed,
  twoFactorEnabled,
  lockoutEnd,
  lockoutEnabled,
  firstName,
  lastName,
  classId
}) => {
  const [detailedInfo, setDetailedInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const toggleDetails = async () => {
    if (!expanded) {
      setLoading(true);
      try {
        const response = await fetch(`/Users/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDetailedInfo(data);
        setExpanded(true);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    } else {
      setExpanded(false);
    }
  };

  return (
    <li>
      <div className="userDetails__wrapper">
        <div className="userDetails__divTop">
          <h1 className="userDetails__title">
            {firstName} {lastName} <span>({userName})</span>
          </h1>
          <p className="userDetails__email">
            <strong>Email:</strong> {email} ({emailConfirmed ? 'Confirmed' : 'Not Confirmed'})
          </p>
          <p className="userDetails__phoneNumber">
            <strong>Phone Number:</strong> {phoneNumber} ({phoneNumberConfirmed ? 'Confirmed' : 'Not Confirmed'})
          </p>
          <p className="userDetails__twoFactor">
            <strong>Two-Factor Enabled:</strong> {twoFactorEnabled ? 'Yes' : 'No'}
          </p>
          <p className="userDetails__lockout">
            <strong>Lockout End:</strong> {new Date(lockoutEnd).toLocaleString()}
          </p>
          <p className="userDetails__lockoutEnabled">
            <strong>Lockout Enabled:</strong> {lockoutEnabled ? 'Yes' : 'No'}
          </p>
          <p className="userDetails__classId">
            <strong>Class ID:</strong> {classId}
          </p>
        </div>
        <div className="userDetails__divBottom">
          <button className="userDetails__button" onClick={toggleDetails}>
            {expanded ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {expanded && detailedInfo && (
          <div className="userDetails__extraInfo">
            <p><strong>Detailed Info:</strong></p>
            <pre>{JSON.stringify(detailedInfo, null, 2)}</pre>
          </div>
        )}
      </div>
    </li>
  );
};

export default UserDetails;
