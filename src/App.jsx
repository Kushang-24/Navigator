import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Form from './components/Form';
import UserList from './components/UserList';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/add" element={<Form />} />
          <Route path="/edit/:id" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;