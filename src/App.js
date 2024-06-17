import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import LoginViev from './components/widoki/LoginViev';
import UserAddViev from './components/widoki/UserAddViev';
import ProfileViev from './components/widoki/ProfileViev';
import AllUsersViev from './components/widoki/AllUsersViev';
import PlanLekcjiViev from './components/widoki/PlanLekcjiViev';
import ClassAddViev from './components/widoki/ClassAddViev';
import SubjectViev from './components/widoki/SubjectViev';
import HomeworkViev from './components/widoki/HomeworkViev';
import GradesViev from './components/widoki/GradesViev';
import TeacherGradesViev from './components/widoki/TeacherGradesViev';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginViev/>} />
          <Route path="/" element={<LoginViev/>} />
          <Route path="/useradd" element={<UserAddViev/>} />
          <Route path="/profile" element={<ProfileViev/>} />
          <Route path="/allusers" element={<AllUsersViev/>} />
          <Route path="/classadd" element={<ClassAddViev/>} />
          <Route path="/grades" element={<GradesViev/>} />
          <Route path="/subjectadd" element={<SubjectViev/>} />
          <Route path="/homeworks" element={<HomeworkViev/>} />
          <Route path="/teachergrades" element={<TeacherGradesViev/>} />
          <Route path="/planlekcji" element={<PlanLekcjiViev/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
