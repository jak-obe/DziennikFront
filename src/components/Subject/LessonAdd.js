import React, { useState, useEffect } from 'react';
import './LessonAdd.css'; // Import CSS zdefiniowane style

const LessonAdd = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [topic, setTopic] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('Classes');
        if (!response.ok) {
          throw new Error('Failed to fetch classes');
        }
        const classesData = await response.json();
        setClasses(classesData.$values);
      } catch (error) {
        console.error('Error fetching classes:', error.message);
        setErrorMessage('Failed to fetch classes');
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await fetch('api/Subjects');
        if (!response.ok) {
          throw new Error('Failed to fetch subjects');
        }
        const subjectsData = await response.json();
        setSubjects(subjectsData.$values);
      } catch (error) {
        console.error('Error fetching subjects:', error.message);
        setErrorMessage('Failed to fetch subjects');
      }
    };

    fetchClasses();
    fetchSubjects();
  }, []);

  const handleAddLesson = async () => {
    if (!selectedClassId || !selectedSubjectId || !topic || !startTime || !endTime) {
      setErrorMessage('All fields are required');
      return;
    }

    const lessonData = {
      classId: selectedClassId,
      subjectId: selectedSubjectId,
      topic,
      startTime,
      endTime,
    };

    try {
      const response = await fetch('Lessons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lessonData),
      });
      console.log(lessonData);
      if (!response.ok) {
        throw new Error('Failed to add lesson');
      }

      console.log('Lesson added successfully');
      setSuccessMessage('Lesson added successfully!');
      setTimeout(() => setSuccessMessage(''), 5000); // Usunięcie komunikatu po 5 sekundach

      // Resetowanie formularza po sukcesie
      setSelectedClassId('');
      setSelectedSubjectId('');
      setTopic('');
      setStartTime('');
      setEndTime('');
    } catch (error) {
      console.error('Error adding lesson:', error.message);
      setErrorMessage('Failed to add lesson');
    }
  };

  return (
    <div className="lesson-add-container">
      <h2>Add Lesson</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <div>
        <label>Select Class:</label>
        <select
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
        >
          <option value="">--Select Class--</option>
          {classes.map((classItem) => (
            <option key={classItem.classId} value={classItem.classId}>
              {classItem.className}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Subject:</label>
        <select
          value={selectedSubjectId}
          onChange={(e) => setSelectedSubjectId(e.target.value)}
        >
          <option value="">--Select Subject--</option>
          {subjects.map((subject) => (
            <option key={subject.subjectId} value={subject.subjectId}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      <div>
        <label>End Time:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      <button type="button" onClick={handleAddLesson}>
        Add Lesson
      </button>
    </div>
  );
};

export default LessonAdd;
