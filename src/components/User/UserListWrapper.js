import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import './UserListWrapper.css';

const UserListWrapper = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetch("Users")
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        const usersData = data.$values || [];
        setUsers(usersData);
      })
      .catch(error => {
        console.error('Error fetching users:', error.message);
      });
  }, []);

  const handleRoleClick = (role) => {
    if (role === selectedRole) {
      setSelectedRole(null); // Zamyka rozwinięty panel, jeśli kliknięto ponownie na ten sam przycisk
    } else {
      setSelectedRole(role);
    }
  };

  const filterUsersByRole = (role) => {
    return users.filter(user => user.roles.$values.includes(role));
  };

  return (
    <div className="user-list-wrapper">
      <div className="role-buttons">
        <button
          className={`role-button ${selectedRole === 'Teacher' ? 'active' : ''}`}
          onClick={() => handleRoleClick('Teacher')}
        >
          Teachers
        </button>
        <button
          className={`role-button ${selectedRole === 'Student' ? 'active' : ''}`}
          onClick={() => handleRoleClick('Student')}
        >
          Students
        </button>
        <button
          className={`role-button ${selectedRole === 'Administrator' ? 'active' : ''}`}
          onClick={() => handleRoleClick('Administrator')}
        >
          Administrators
        </button>
        <button
          className={`role-button ${selectedRole === 'User' ? 'active' : ''}`}
          onClick={() => handleRoleClick('User')}
        >
          Users
        </button>
      </div>

      {selectedRole && (
        <div className="role-users">
          <h2>{selectedRole}s</h2>
          {filterUsersByRole(selectedRole).map(user => (
            <UserDetails key={user.$id} {...user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserListWrapper;
