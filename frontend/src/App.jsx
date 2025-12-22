import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CreateNotes from "./pages/AddNotes/CreateNotes";
import EditNote from "./pages/EditNotes/EditNotes";
import ViewNote from "./pages/ViewNote/ViewNote";
import PrivateRoute from "./components/PrivateRoute";
import Landing from "./pages/Landing/Landing";
import Error from "./pages/Error/Error";
import PasswordReset from "./pages/PasswordReset/PasswordReset";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path="/" element={<Landing />} />

        {/* Protecting Routes */}
        <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/createnote" element={<PrivateRoute><CreateNotes /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditNote /></PrivateRoute>} />
        <Route path="/note/:id" element={<PrivateRoute><ViewNote /></PrivateRoute>} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
