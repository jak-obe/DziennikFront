import React, { useEffect, useState } from 'react';
import './PlanLekcji.css';

const PlanLekcji = () => {
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const userResponse = await fetch('Users/me');
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();
        setUserId(userData.id);

        const scheduleResponse = await fetch(`/api/Schedule/student/${userData.id}`);
        if (!scheduleResponse.ok) {
          throw new Error('Failed to fetch schedule');
        }
        const scheduleData = await scheduleResponse.json();
        setSchedule(scheduleData.$values || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  const groupedSchedule = daysOfWeek.reduce((acc, day) => {
    acc[day] = [];
    return acc;
  }, {});

  schedule.forEach((lesson) => {
    const day = getDayOfWeek(lesson.startTime);
    groupedSchedule[day].push(lesson);
  });

  if (loading) {
    return <div className="plan-lekcji">Loading...</div>;
  }

  if (error) {
    return <div className="plan-lekcji">Error: {error}</div>;
  }

  const calculatePositionAndHeight = (startTime, endTime, containerHeight) => {
    const startHour = new Date(startTime).getHours();
    const startMinute = new Date(startTime).getMinutes();
    const endHour = new Date(endTime).getHours();
    const endMinute = new Date(endTime).getMinutes();

    // Calculate the top position and height based on the hours between 6:00 and 18:00
    const startOffset = (startHour - 6) * 60 + startMinute;
    const endOffset = (endHour - 6) * 60 + endMinute;

    const top = (startOffset / (12 * 60)) * containerHeight;
    const height = ((endOffset - startOffset) / (12 * 60)) * containerHeight;

    return { top, height };
  };

  return (
    <div className="plan-lekcji">
      <h2>Plan Lekcji</h2>
      <div className="week">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-column">
            <h3>{day}</h3>
            <div className="day-schedule">
              {groupedSchedule[day].map((lesson) => {
                const { top, height } = calculatePositionAndHeight(
                  lesson.startTime,
                  lesson.endTime,
                  800 // Assuming 1000px height for the container
                );

                return (
                  <div
                    key={lesson.$id}
                    className="lesson-box"
                    style={{
                      top: `${top}px`,
                      height: `${height}px`,
                    }}
                  >
                    <p className="lesson-topic">{lesson.topic}</p>
                    <p className="lesson-time">
                      {new Date(lesson.startTime).toLocaleTimeString('pl-PL', {
                        hour: 'numeric',
                        minute: 'numeric',
                      })}{' '}
                      -{' '}
                      {new Date(lesson.endTime).toLocaleTimeString('pl-PL', {
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanLekcji;
