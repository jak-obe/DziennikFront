import React, { useEffect, useState } from 'react';
import './Homeworks.css'; // Dodajemy import pliku CSS

const Homeworks = () => {
  const [homeworks, setHomeworks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeworks = async () => {
      try {
        const response = await fetch('Homeworks/student', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch homeworks');
        }
        const data = await response.json();
        const cleanData = data.$values || [];
        setHomeworks(cleanData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchHomeworks();
  }, []);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="homeworks-container">
      <h2>My Homeworks</h2>
      {homeworks.length === 0 ? (
        <p>No homeworks found.</p>
      ) : (
        <ul className="homeworks-list">
          {homeworks.map((homework) => (
            <li key={homework.homeworkId} className="homework-item">
              <h3>{homework.lesson.topic}</h3>
              <p>{homework.description}</p>
              <p>Due Date: {new Date(homework.dueDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Homeworks;
