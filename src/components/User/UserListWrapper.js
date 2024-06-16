import React, { useState, useEffect } from 'react';
import UserDetails from './UserDetails';

const UserListWrapper = () => {
  const [users, setUsers] = useState([]);
    
  useEffect(() => {
    fetch("Users", {
        headers: {
            "Content-Type": "application/jason",
        },
        method: "get",
        body: null
    })
    .then((response) => Promise.all([response.json(), response.headers]))
    .then(([body, headers]) => {
        // console.log(body.$values);
        const value = body.$values.map(user => user)
            setUsers(value);
    
            // console.log(value);
    
        });
    },
    [
        
    ]);


  return (
    <div className="user-list-wrapper">
      {users.map(user => (
        <UserDetails key={user.$id} {... user}/>
      ))}
    </div>
  );
};

export default UserListWrapper;
