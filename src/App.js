import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import LoginViev from './components/widoki/LoginViev';
import UserAddViev from './components/widoki/UserAddViev';
import ProfileViev from './components/widoki/ProfileViev';
import AllUsersViev from './components/widoki/AllUsersViev';
import PlanLekcjiView from "./components/PlanLekcji/PlanLekcjiView";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginViev/>} />
          <Route path="/useradd" element={<UserAddViev/>} />
          <Route path="/profile" element={<ProfileViev/>} />
          <Route path="/allusers" element={<AllUsersViev/>} />
          <Route path="/planlekcji" element={<PlanLekcjiView $id={"e734ce49-b965-4f4a-8b0e-da8afcb40939"}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
