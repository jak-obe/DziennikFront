import React, { useState, useEffect } from 'react';
import './Grades.css';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await fetch('Users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        const studentId = userData.id;

        const gradesResponse = await fetch(`Grades/${studentId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        if (!gradesResponse.ok) {
          throw new Error('Failed to fetch grades');
        }
        const gradesData = await gradesResponse.json();
        setGrades(gradesData?.$values || gradesData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGrades();
  }, []);

  return (
    <div className="grades-container">
      <h2>Your Grades</h2>
      {error && <p className="error">{error}</p>}
      {grades.length > 0 ? (
        <table className="grades-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.gradeId}>
                <td>{grade.subject ? grade.subject.name : 'N/A'}</td>
                <td>{grade.value}</td>
                <td>{new Date(grade.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No grades available</p>
      )}
    </div>
  );
};

export default Grades;