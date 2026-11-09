import React from "react";
import { useNavigate } from "react-router-dom";

const LandingNavbar = () => {
      const navigate = useNavigate();

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b border-blue-100 bg-white/70 backdrop-blur-md sticky top-0 z-10">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-blue-600 cursor-pointer"
      >
        NoteDeck
      </h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 rounded-md font-medium text-blue-600 hover:text-blue-800"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
        >
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default LandingNavbar;
