import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Password from "../../components/Input/Password";
import { ValidateEmail } from "../../utils/helper";
import api from "../../utils/api";
import { useEffect } from "react";
export default function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({ email: "", password: "", error: null });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value, error: null }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!ValidateEmail(login.email)) {
      setLogin((prev) => ({
        ...prev,
        error: "Please enter a valid email address.",
      }));
      return;
    }
    if (!login.password) {
      setLogin((prev) => ({ ...prev, error: "Please enter the password" }));
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email: login.email,
        password: login.password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (err) {
      setLogin((prev) => ({
        ...prev,
        error: err.response?.data?.message || "Login failed. Try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600">
          Welcome back
        </h1>
        <p className="text-sm sm:text-base text-blue-900/70 mt-1">
          Sign in to your account to continue taking notes
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-lg font-semibold text-center text-blue-600 mb-2">
          Log In
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email and password to access your notes
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Enter your email"
              value={login.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <Password
              id="password"
              name="password"
              value={login.password}
              onChange={handleChange}
            />
          </div>

          {login.error && <p className="text-red-500 text-sm">{login.error}</p>}

          <div className="text-left">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Log Into Account"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
