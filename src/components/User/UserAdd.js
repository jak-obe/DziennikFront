import React, { useState } from 'react';
import './UserAdd.css'; // Załóżmy, że istnieje plik UserAdd.css dla stylizacji

const UserAdd = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Nowy state do pokazywania/ukrywania hasła
  const [role, setRole] = useState('User'); // Domyślna rola jako 'User'

  const handleAddUser = async (e) => {
    e.preventDefault();

    const newUser = { firstName, lastName, email, password, role };

    const response = await fetch('Users/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    const res = await response.status;

    if (res === 200) {
      console.log('User added successfully!', res);
      // Handle the response data here (e.g., show success message)
    } else {
      console.log('Failed to add user:', res);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="user-add-container">
      <h2>Add User</h2>
      <form onSubmit={handleAddUser}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type={showPassword ? 'text' : 'password'} // Umożliwia pokazywanie/ukrywanie hasła
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            Show Password
          </label>
        </div>
        <div>
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="User">User</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserAdd;
