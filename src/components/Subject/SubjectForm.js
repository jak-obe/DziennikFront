import React, { useState, useEffect } from 'react';
import './SubjectForm.css'; // Import CSS dla stylizacji

const SubjectForm = () => {
  const [subjectId, setSubjectId] = useState(0);
  const [name, setName] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [classId, setClassId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('/Users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const userData = await response.json();
        const teacherList = userData.$values.filter(user => user.roles.$values.includes('Teacher'));
        setTeachers(teacherList);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSubject = {
      subjectId,
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

      setSubjectId(createdSubject.subjectId); // Ustawienie subjectId dla przypisania nauczyciela

      // Resetowanie formularza po sukcesie
      setName('');
    } catch (error) {
      console.error('Error creating subject:', error.message);
    }
  };

  const handleAssignTeacher = async () => {
    if (!subjectId || !selectedTeacherId) {
      return;
    }

    try {
      const response = await fetch(`/api/Subjects/${subjectId}/assignTeacher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacherId: selectedTeacherId }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign teacher');
      }

      console.log('Teacher assigned successfully');
      setSuccessMessage('Teacher assigned successfully!');
      setTimeout(() => setSuccessMessage(''), 5000); // Usunięcie komunikatu po 5 sekundach

      // Resetowanie wyboru nauczyciela po sukcesie
      setSelectedTeacherId('');
    } catch (error) {
      console.error('Error assigning teacher:', error.message);
    }
  };

  const handleAssignClass = async () => {
    if (!subjectId || !classId) {
      return;
    }

    try {
      const response = await fetch(`/api/Subjects/${subjectId}/assignClass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ classId }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign class');
      }

      console.log('Class assigned successfully');
      setSuccessMessage('Class assigned successfully!');
      setTimeout(() => setSuccessMessage(''), 5000); // Usunięcie komunikatu po 5 sekundach

      // Resetowanie wyboru klasy po sukcesie
      setClassId('');
    } catch (error) {
      console.error('Error assigning class:', error.message);
    }
  };

  const handleFetchLessons = async () => {
    try {
      const response = await fetch('/Lessons');
      if (!response.ok) {
        throw new Error('Failed to fetch lessons');
      }
      const lessonsData = await response.json();
      setLessons(lessonsData);
      console.log('Lessons fetched successfully', lessonsData);
    } catch (error) {
      console.error('Error fetching lessons:', error.message);
    }
  };

  return (
    <div className="subject-form-container">
      <form className="subject-form" onSubmit={handleSubmit}>
        <h2>Create Subject</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <div>
          <label>Subject ID:</label>
          <input
            type="number"
            value={subjectId}
            onChange={(e) => setSubjectId(Number(e.target.value))}
            required
          />
        </div>
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

      {subjectId > 0 && (
        <div className="assign-teacher">
          <h3>Assign Teacher to Subject</h3>
          <div>
            <label>Select Teacher:</label>
            <select
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
            >
              <option value="">--Select Teacher--</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName} ({teacher.userName})
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={handleAssignTeacher}>
            Assign Teacher
          </button>
        </div>
      )}

      {subjectId > 0 && (
        <div className="assign-class">
          <h3>Assign Class to Subject</h3>
          <div>
            <label>Class ID:</label>
            <input
              type="text"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={handleAssignClass}>
            Assign Class
          </button>
        </div>
      )}

      <div className="fetch-lessons">
        <h3>Fetch Lessons</h3>
        <button type="button" onClick={handleFetchLessons}>
          Fetch Lessons
        </button>
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.lessonId}>
              <p>Lesson ID: {lesson.lessonId}</p>
              <p>Topic: {lesson.topic}</p>
              <p>Start Time: {lesson.startTime}</p>
              <p>End Time: {lesson.endTime}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubjectForm;
