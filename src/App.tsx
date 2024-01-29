import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet, Link } from "react-router-dom";
import ActiveWidgets from './widgets/ActiveWidgets';
import ManageWidgets from './widgets/ManageWidgets';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (

    <>
    <div className='nav-style'>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/manage">Manage Widgets</Link>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <h1><center>
        Widgets Dashboard</center>
      </h1>
    </div>
      <Outlet />

      <Routes>
        <Route path="/" element={<ActiveWidgets />} />
        <Route path="/manage" element={<ManageWidgets />} />
      </Routes>

    </>

  );
}

export default App;
