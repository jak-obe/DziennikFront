// src/components/Home.js

import React from 'react';
import SubjectForm from '../Subject/SubjectForm';
import NavigationAdmin from '../Navigation/NavigationAdmin';

const SubjectViev = () => {
  return (
    <div>
      <NavigationAdmin></NavigationAdmin>
      <SubjectForm/>
    </div>
  );
};

export default SubjectViev;
