import React from 'react';
import { Router, Link } from "@reach/router"
import TorusKnot from './pages/TorusKnot'
import Plane from './pages/Plane'
import './App.css';

function App() {
  return (
  <>
  <nav className="nav">
    <ul>
      <li><Link to="/">TorusKnot</Link></li>
      <li><Link to="/plane">Plane</Link></li>
    </ul>
  </nav>
  <Router>
    <TorusKnot path="/" />
    <Plane path="/plane" />
  </Router>
  </>
  );
}

export default App;
