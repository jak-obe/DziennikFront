// src/components/Home.js

import React from 'react';
import SubjectForm from '../Subject/SubjectForm';
import NavigationAdmin from '../Navigation/NavigationAdmin';
import SubjectAdd from '../Subject/SubjectAdd';
import SubjectAddTeacher from '../Subject/SubjectAddTeacher';
import LessonAdd from '../Subject/LessonAdd';

const SubjectViev = () => {
  return (
    <div>
      <NavigationAdmin></NavigationAdmin>
      <div>
        <LessonAdd/>
      </div>
      <div>
      <SubjectAdd/>
      </div>
      <div>
      <SubjectAddTeacher/>
      </div>
    </div>
  );
};

export default SubjectViev;
