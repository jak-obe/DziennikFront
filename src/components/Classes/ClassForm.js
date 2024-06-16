import React, { useState, useEffect } from 'react';
import './ClassForm.css'; // Import pliku CSS

const ClassForm = () => {
  const [classId, setClassId] = useState(0);
  const [className, setClassName] = useState('');
  const [year, setYear] = useState(0);
  const [studentIds, setStudentIds] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/Users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const userData = await response.json();
        const studentList = userData.$values.filter(user => user.roles.$values.includes('Student'));
        setStudents(studentList);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newClass = {
      classId,
      className,
      year,
      studentIds,
    };

    try {
      const response = await fetch('/api/Classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClass),
      });

      if (!response.ok) {
        throw new Error('Failed to create class');
      }

      console.log('Class created successfully');
      // Możesz dodać dodatkową logikę np. czyszczenie formularza lub przekierowanie użytkownika
    } catch (error) {
      console.error('Error creating class:', error.message);
    }
  };

  const handleAddStudent = () => {
    if (selectedStudentId && !studentIds.includes(selectedStudentId)) {
      setStudentIds([...studentIds, selectedStudentId]);
      setSelectedStudentId('');
    }
  };

  const handleRemoveStudent = (id) => {
    setStudentIds(studentIds.filter(studentId => studentId !== id));
  };

  return (
    <form className="class-form" onSubmit={handleSubmit}>
      <div>
        <label>Class ID:</label>
        <input
          type="number"
          value={classId}
          onChange={(e) => setClassId(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Class Name:</label>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Select Student:</label>
        <select value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)}>
          <option value="">--Select Student--</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.firstName} {student.lastName} ({student.userName})
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddStudent}>Add Student</button>
      </div>
      <div>
        <label>Selected Students:</label>
        <ul>
          {studentIds.map((id) => {
            const student = students.find(student => student.id === id);
            return (
              <li key={id}>
                {student.firstName} {student.lastName} ({student.userName})
                <button type="button" onClick={() => handleRemoveStudent(id)}>Remove</button>
              </li>
            );
          })}
        </ul>
      </div>
      <button type="submit">Create Class</button>
    </form>
  );
};

export default ClassForm;
