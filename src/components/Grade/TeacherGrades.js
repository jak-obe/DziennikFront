import React, { useState, useEffect } from 'react';
import './TeacherGrades.css';

const TeacherGrades = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentsAndSubjects = async () => {
      try {
        const responseStudents = await fetch('Users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        if (!responseStudents.ok) {
          throw new Error('Failed to fetch students');
        }
        const usersData = await responseStudents.json();
        const studentsData = usersData?.$values || usersData;

        const studentList = studentsData.filter(user => {
          const roles = user.roles?.$values || user.roles;
          return Array.isArray(roles) && roles.includes('Student');
        });
        setStudents(studentList);

        const responseSubjects = await fetch('api/Subjects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        if (!responseSubjects.ok) {
          throw new Error('Failed to fetch subjects');
        }
        const subjectsData = await responseSubjects.json();
        setSubjects(subjectsData?.$values || subjectsData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStudentsAndSubjects();
  }, []);

  const handleAddGrade = async (e) => {
    e.preventDefault();
    console.log(selectedStudent);
    try {
      const response = await fetch('Grades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          studentId: selectedStudent,
          classId: 1,  
          subjectId: selectedSubject,
          value: grade,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add grade');
      }
      setMessage('Grade added successfully');
      setSelectedStudent('');
      setSelectedSubject('');
      setGrade('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="teacher-grades-container">
      <h2>Assign Grades only Teacher</h2>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleAddGrade}>
        <label>
          Student:
          <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} required>
            <option value="">Select a student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>
            ))}
          </select>
        </label>
        <label>
          Subject:
          <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} required>
            <option value="">Select a subject</option>
            {subjects.map(subject => (
              <option key={subject.subjectId} value={subject.subjectId}>{subject.name}</option>
            ))}
          </select>
        </label>
        <label>
          Grade:
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Grade</button>
      </form>
    </div>
  );
};

export default TeacherGrades;