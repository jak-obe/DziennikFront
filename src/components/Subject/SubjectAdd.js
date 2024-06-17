import React, { useState } from 'react';
import './SubjectForm.css'; // Import CSS dla stylizacji

const SubjectAdd = () => {
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSubject = {
      subjectId: 0, // Stałe ustawienie subjectId na zero
      name,
    };

    try {
      const response = await fetch('/api/Subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubject),
      });

      if (!response.ok) {
        throw new Error('Failed to create subject');
      }

      const createdSubject = await response.json();
      console.log('Subject created successfully', createdSubject);
      setSuccessMessage('Subject created successfully!');
      setTimeout(() => setSuccessMessage(''), 5000); // Usunięcie komunikatu po 5 sekundach

      // Resetowanie formularza po sukcesie
      setName('');
    } catch (error) {
      console.error('Error creating subject:', error.message);
    }
  };

  return (
    <div className="subject-form-container">
      <form className="subject-form" onSubmit={handleSubmit}>
        <h2>Create Subject</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <div>
          <label>Subject Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Subject</button>
      </form>
    </div>
  );
};

export default SubjectAdd;
