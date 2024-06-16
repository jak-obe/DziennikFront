import React, { useEffect, useState } from 'react';
import './PlanLekcji.css';

const PlanLekcji = () => {
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("null"); // Stan przechowujący dane użytkownika

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // Możesz tutaj użyć fetch lub axios do pobrania danych z API
        // Symulacja danych, zastąp tym rzeczywistym zapytaniem HTTP
        const response = await fetch(`Users/me`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setId(userData.id);
        console.log(id);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    
      try {
        const response = await fetch(`/api/Schedule/student/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setSchedule(data.$values); // Zakładając, że dane znajdują się w $values
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [id]);

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  const groupedSchedule = daysOfWeek.reduce((acc, day) => {
    acc[day] = [];
    return acc;
  }, {});

  schedule.forEach(lesson => {
    const day = getDayOfWeek(lesson.startTime);
    groupedSchedule[day].push(lesson);
  });

  // Sortowanie lekcji danego dnia po czasie rozpoczęcia
  Object.keys(groupedSchedule).forEach(day => {
    groupedSchedule[day].sort((a, b) => {
      return new Date(a.startTime) - new Date(b.startTime);
    });
  });

  if (loading) {
    return <div className="plan-lekcji">Loading...</div>;
  }

  return (

    <div className="plan-lekcji">
      <h2>Plan Lekcji</h2>
      <div className="week">
        {daysOfWeek.map(day => (
          <div key={day} className="day-column">
            <h3>{day}</h3>
            {groupedSchedule[day].map(lesson => (
              <div key={lesson.$id} className="lesson-box">
                <p>{lesson.topic}</p>
                <p>{new Date(lesson.startTime).toLocaleTimeString()} - {new Date(lesson.endTime).toLocaleTimeString()}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanLekcji;
