import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ValidateEmail } from "../../utils/helper";
import api from "../../utils/api";
import Password from "../../components/Input/Password";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailVerified, setEmailVerified] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // STEP 1: EMAIL VALIDATION
  const handleEmailCheck = async (e) => {
    e.preventDefault();

    if (!ValidateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/check-email", { email });
      setEmailVerified(true);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Email not found");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: PASSWORD RESET
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Password and confirm password are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        email,
        password,
      });
      alert("Password updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-center text-blue-600 mb-2">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          {emailVerified
            ? "Create a new password"
            : "Enter your registered email"}
        </p>

        {/* EMAIL FORM */}
        {!emailVerified && (
          <form onSubmit={handleEmailCheck} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700"
            >
              {loading ? "Checking..." : "Continue"}
            </button>
          </form>
        )}

        {/* PASSWORD FORM */}
        {emailVerified && (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <Password
                id="new-password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <Password
                id="confirm-password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Confirm new password"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}

        <p className="text-sm text-center text-gray-600 mt-4">
          Back to{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
