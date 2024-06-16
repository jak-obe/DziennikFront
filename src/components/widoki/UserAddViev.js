// src/components/Home.js

import React from 'react';
import UserAdd from '../User/UserAdd';
import NavigationAdmin from '../Navigation/NavigationAdmin';

const UserAddViev= () => {
  return (
    <div>
        <NavigationAdmin></NavigationAdmin>
        <UserAdd></UserAdd>
    </div>
  );
};

export default UserAddViev;
