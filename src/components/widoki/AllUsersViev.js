// src/components/Home.js

import React from 'react';
import UserListWrapper from '../User/UserListWrapper';
import NavigationAdmin from '../Navigation/NavigationAdmin';

const AllUsersViev = () => {
  return (
    <div>
      <NavigationAdmin></NavigationAdmin>
      <UserListWrapper></UserListWrapper>
    </div>
  );
};

export default AllUsersViev;
