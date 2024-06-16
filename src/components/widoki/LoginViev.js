// src/components/Home.js

import React from 'react';
import Login from '../Login/Login';
import Navigation from '../Navigation/Navigation';

const LoginViev = () => {
  return (
    <div>
      <Navigation></Navigation>
        <Login></Login>
    </div>
  );
};

export default LoginViev;
