import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import debounce from "lodash.debounce";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };


  const debouncedSearch = debounce((value) => {
    const trimmed = value.trim();
    if (trimmed) {
      navigate(`/dashboard?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/dashboard");
    }
  }, 400);

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery]);

  const onClearSearch = () => {
    setSearchQuery("");
    navigate("/dashboard");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer"
          >
            <h1 className="text-2xl ml-2 sm:ml-0 font-bold text-blue-600 tracking-tight">
              NoteDeck
            </h1>
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            <div className="w-64 lg:w-72">
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClearSearch={onClearSearch}
              />
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <ProfileInfo onLogout={onLogout} />
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-md hover:bg-gray-100 transition"
          >
            {menuOpen ? (
              <MdClose className="text-2xl text-slate-700" />
            ) : (
              <MdMenu className="text-2xl text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClearSearch={onClearSearch}
              className="w-full"
            />
            <div className="mt-4 border-t border-gray-100 pt-3">
              <ProfileInfo onLogout={onLogout} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
