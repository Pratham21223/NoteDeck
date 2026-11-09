import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ValidateEmail } from "../../utils/helper";
import api from "../../utils/api";
import Password from "../../components/Input/Password";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [step, setStep] = useState("email"); // "email" | "password"
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  // STEP 1: Validate Email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!ValidateEmail(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/check-email", { email: form.email });
      setStep("password"); // ✅ show password fields
    } catch (err) {
      setError(err.response?.data?.message || "Email not found");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Reset Password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        email: form.email,
        password: form.password,
      });

      //login after password change
      const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        await navigate("/dashboard");
        alert("Password changed successfully, redirecting to Dashboard.")

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
          {step === "email"
            ? "Enter your registered email"
            : "Create a new password"}
        </p>

        {/* STEP 1: EMAIL */}
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
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

        {/* STEP 2: PASSWORD */}
        {step === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <Password
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <Password
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
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
