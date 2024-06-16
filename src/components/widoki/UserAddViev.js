// src/components/Home.js

import React from 'react';
import UserAdd from '../User/UserAdd';
import Navigation from '../Navigation/Navigation';

const UserAddViev= () => {
  return (
    <div>
        <Navigation></Navigation>
        <UserAdd></UserAdd>
    </div>
  );
};

export default UserAddViev;
