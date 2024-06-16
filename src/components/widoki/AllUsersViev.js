// src/components/Home.js

import React from 'react';
import UserListWrapper from '../User/UserListWrapper';
import NavigationExtend from '../Navigation/NavigationExtend';

const AllUsersViev = () => {
  return (
    <div>
      <NavigationExtend></NavigationExtend>
      <UserListWrapper></UserListWrapper>
    </div>
  );
};

export default AllUsersViev;
