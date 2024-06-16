// src/components/Home.js

import React from 'react';
import UsersId from '../User/UsersId';
import NavigationExtend from '../Navigation/NavigationExtend';

const ProfileViev = () => {
  return (
    <div>
      <NavigationExtend></NavigationExtend>
        <UsersId></UsersId>
    </div>
  );
};

export default ProfileViev;
