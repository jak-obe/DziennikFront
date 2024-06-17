import React, { useState, useEffect } from 'react';
import './SubjectAddTeacher.css'; // Import CSS zdefiniowane style

const SubjectAddTeacher = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
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

    const fetchTeachers = async () => {
      try {
        const response = await fetch('Users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData = await response.json();
        const teachersData = usersData.$values.filter(user => user.roles.$values.includes('Teacher'));
        setTeachers(teachersData);
      } catch (error) {
        console.error('Error fetching teachers:', error.message);
        setErrorMessage('Failed to fetch teachers');
      }
    };

    fetchSubjects();
    fetchTeachers();
  }, []);

  const handleAssignTeacher = async () => {
    if (!selectedSubjectId || !selectedTeacherId) {
      return;
    }
    try {
        const response = await fetch(`api/Subjects/${selectedSubjectId}/assignTeacher`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ teacherId: selectedTeacherId }),
        });
        console.log(selectedTeacherId);
        console.log(selectedSubjectId);

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
      setErrorMessage('Failed to assign teacher');
    }
  };

  return (
    <div className="subject-add-teacher-container">
      <h2>Add Teacher to Subject</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
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

      {selectedSubjectId && (
        <div className="assign-teacher">
          <label>Select Teacher:</label>
          <select
            value={selectedTeacherId}
            onChange={(e) => setSelectedTeacherId(e.target.value)}
          >
            <option value="">--Select Teacher--</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={ teacher.id}>
                {teacher.firstName} {teacher.lastName}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAssignTeacher}>
            Assign Teacher
          </button>
        </div>
      )}
    </div>
  );
};

export default SubjectAddTeacher;
