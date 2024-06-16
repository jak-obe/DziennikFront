// src/components/Home.js

import React from 'react';
import UsersId from '../User/UsersId';
import NavigationMenager from '../Navigation/NavigationMenager';

const ProfileViev = () => {
  return (
    <div>
      <NavigationMenager></NavigationMenager>
        <UsersId></UsersId>
    </div>
  );
};

export default ProfileViev;
