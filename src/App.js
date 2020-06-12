import React from 'react';
import { Router, Link } from "@reach/router"
import TorusKnot from './pages/TorusKnot'
import Plane from './pages/Plane'
import './App.css';

function App() {
  return (
  <>
  <nav className="nav">
    <Link to="/">TorusKnot</Link> | <Link to="/plane">Plane</Link>
  </nav>
  <Router>
    <TorusKnot path="/" />
    <Plane path="/plane" />
  </Router>
  </>
  );
}

export default App;
