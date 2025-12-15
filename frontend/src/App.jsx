import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import CreateNotes from './pages/AddNotes/CreateNotes';
import Navbar from './components/Navbar/Navbar';
import EditNote from './pages/EditNotes/EditNotes';
import ViewNote from './pages/ViewNote/ViewNote';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createnote" element={<CreateNotes />} />
        <Route path="/edit/:id" element={< EditNote/>} />
        <Route path="/note/:id" element={< ViewNote/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App