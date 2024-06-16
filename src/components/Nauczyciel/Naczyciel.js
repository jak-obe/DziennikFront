import React, { useState } from 'react';

const Nauczyciel = ({ onSubmit }) => {
  const [studentId, setStudentId] = useState('');
  const [classId, setClassId] = useState('');
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'studentId') {
      setStudentId(value);
    } else if (name === 'classId') {
      setClassId(value);
    } else if (name === 'value') {
      setValue(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ studentId, classId, value });
    // Możesz tutaj wyczyścić pola formularza, jeśli potrzebujesz
    setStudentId('');
    setClassId('');
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="studentId">Student ID:</label>
        <input
          type="text"
          id="studentId"
          name="studentId"
          value={studentId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="classId">Class ID:</label>
        <input
          type="text"
          id="classId"
          name="classId"
          value={classId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="value">Value:</label>
        <input
          type="text"
          id="value"
          name="value"
          value={value}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Nauczyciel;
