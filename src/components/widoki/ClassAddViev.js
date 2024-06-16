// src/components/Home.js

import React from 'react';
import ClassForm from '../Classes/ClassForm';
import NavigationAdmin from '../Navigation/NavigationAdmin';

const ClassAddViev = () => {
  return (
    <div>
      <NavigationAdmin></NavigationAdmin>
      <ClassForm/>
    </div>
  );
};

export default ClassAddViev;
