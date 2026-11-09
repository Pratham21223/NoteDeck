import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Password from "../../components/Input/Password";
import { ValidateEmail } from "../../utils/helper";
import api from "../../utils/api";
import { useEffect } from "react";
export default function Signup() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup((prev) => ({ ...prev, [name]: value, error: null }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!signup.name.trim()) {
      setSignup((prev) => ({ ...prev, error: "Please enter your name" }));
      return;
    }
    if (!ValidateEmail(signup.email)) {
      setSignup((prev) => ({
        ...prev,
        error: "Please enter a valid email address.",
      }));
      return;
    }
    if (!signup.password) {
      setSignup((prev) => ({ ...prev, error: "Please enter the password" }));
      return;
    }

    setLoading(true);
    try {
      let res = await api.post("/auth/register", {
        name: signup.name,
        email: signup.email,
        password: signup.password,
      });

      //After signup login
      if(res){
        const res2 = await api.post("/auth/login", {
        email: signup.email,
        password: signup.password,
      });

      const { token, user } = res2.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
      }
    } catch (err) {
      setSignup((prev) => ({
        ...prev,
        error: err.response?.data?.message || "Signup failed. Try again.",
      }));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600">
          Create your account
        </h1>
        <p className="text-sm sm:text-base text-blue-900/70 mt-1">
          Start organizing your thoughts and ideas today
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-lg font-semibold text-center text-blue-600 mb-2">
          Sign up
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Create your account to get started with Notedeck
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={signup.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              autoComplete="name"
            />
          </div>

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
              value={signup.email}
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
              value={signup.password}
              onChange={handleChange}
            />
          </div>

          {signup.error && (
            <p className="text-red-500 text-sm">{signup.error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create account"}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
