// src/components/Home.js

import React from 'react';
import TeacherGrades from '../Grade/TeacherGrades';
import NavigationAdmin from '../Navigation/NavigationAdmin';

const TeacherGradesViev = () => {
  return (
    <div>
      <NavigationAdmin></NavigationAdmin>
      <TeacherGrades/>
    </div>
  );
};

export default TeacherGradesViev;
