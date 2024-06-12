import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AddDriver from './pages/AddDriver';
import AddBooking from './pages/AddBooking';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-driver" element={<AddDriver />} />
          <Route path="/add-booking" element={<AddBooking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
