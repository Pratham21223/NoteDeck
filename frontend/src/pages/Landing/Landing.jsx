import React from "react";
import { useNavigate } from "react-router-dom";
import { MdNotes, MdSecurity, MdCloud } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect } from "react";
import LandingNavbar from "../../components/Navbar/LandingNavbar";

const Landing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex flex-col">
      {/* Navbar */}
      <LandingNavbar/>
      {/* Hero Section */}
      <main className="flex flex-col-reverse md:flex-row justify-between items-center px-8 md:px-16 py-12 md:py-20 grow">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Organize your thoughts <br /> with{" "}
            <span className="text-blue-600">NoteDeck</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Capture, edit, and manage your notes effortlessly — from anywhere,
            on any device.
          </p>

          {/* ✅ Responsive Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center md:justify-start">
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50"
            >
              Already have an account?
            </button>
          </div>
        </motion.div>

        {/* Right */}
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png"
          alt="Notes Illustration"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-72 md:w-md mb-10 md:mb-0"
        />
      </main>

      {/* Features Section */}
      <section className="py-16 bg-white border-t border-blue-100">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why choose NoteDeck?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-8 md:px-20">
          <FeatureCard
            icon={<MdNotes className="text-blue-600 text-4xl" />}
            title="Easy to Use"
            description="A clean and intuitive interface that helps you focus on what matters — your notes."
          />
          <FeatureCard
            icon={<MdSecurity className="text-blue-600 text-4xl" />}
            title="Secure & Private"
            description="Your data is safe. We use authentication and encryption to protect your information."
          />
          <FeatureCard
            icon={<MdCloud className="text-blue-600 text-4xl" />}
            title="Access Anywhere"
            description="Cloud-based storage lets you view and edit your notes on any device."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-blue-50 border-t border-blue-100 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} NoteDeck. Built with ❤️ by Pratham Kataria.
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition bg-white text-center"
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
);

export default Landing;
