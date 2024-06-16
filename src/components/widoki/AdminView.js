// src/components/Home.js

import React from 'react';
import UserListWrapper from '../User/UserListWrapper';
import NavigationExtend from '../Navigation/NavigationExtend';
import NavigationAdmin from '../Navigation/NavigationAdmin';

const AdminView = () => {
  return (
    <div>
      {/*<NavigationExtend></NavigationExtend>*/}
        <NavigationAdmin></NavigationAdmin>
      <UserListWrapper></UserListWrapper>
    </div>
  );
};

export default AdminView;
