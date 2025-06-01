// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Blog from './components/blog';
import Product from './components/Product';
import ProductEdit from './components/ProductEdit';
import ProductView from './components/ProductView';



function App() {
  return (
    <>
    <ul>
      <Link to={'/dashboard'}>Dashoard</Link>
      <Link to={'/login'}>Login</Link>
      <Link to={'/register'}>Register</Link>
      <Link to={'/logout'}>Logout</Link>
    </ul>



    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
       <Route path="/blog" element={<Blog />} />
       <Route path="/product" element={<Product/>} />
     

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}

export default App;
