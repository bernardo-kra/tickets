import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Home/Header/Header.jsx';
import Home from './Components/Home/Home.jsx';
import Register from './Components/Register/Register.jsx';
import Navigation from './components/Navigation';
import Login from './Components/Login/Login.jsx';


const App = () => {
  return (
    <>
      <h1>React Router</h1>
      <Navigation />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
export default App;
