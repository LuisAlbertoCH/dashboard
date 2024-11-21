import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import Talents from './components/Talents';
import Projects from './components/Projects';

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="main">
          <Topbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/talentos" element={<Talents />} />
              <Route path="/plan-de-trabajo" element={<Projects />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
