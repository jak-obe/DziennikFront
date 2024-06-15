// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './components/widoki/Home';
import UserAddViev from './components/widoki/UserAddViev';
import Profile from './components/widoki/Profile';

const App = () => {
  return (
    <Router>
       <div className="App">
        <header>
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<Home/>}/>
            <Route path="/useradd" element={<UserAddViev/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>

        </main>
      </div>
    </Router>
  );
};

export default App;
