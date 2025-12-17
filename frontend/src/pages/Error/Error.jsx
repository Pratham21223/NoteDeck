import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import LandingNavbar from "../../components/Navbar/LandingNavbar";

const Error = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <>
      {/* Navbar based on auth */}
      {isLoggedIn ? <Navbar /> : <LandingNavbar />}

      {/* 404 Content */}
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 sm:px-6">
        
        {/* 404 Heading */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-blue-600">
          404
        </h1>

        {/* Title */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mt-3 sm:mt-4">
          Page Not Found
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-xs sm:max-w-md">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Button (only for logged-in users) */}
        {isLoggedIn && (
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-5 sm:mt-6 px-5 sm:px-6 py-2 sm:py-2.5 
                       bg-blue-600 hover:bg-blue-700 
                       text-sm sm:text-base text-white 
                       rounded-md font-medium transition"
          >
            Back to Dashboard
          </button>
        )}
      </div>
    </>
  );
};

export default Error;
