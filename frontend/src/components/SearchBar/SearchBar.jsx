import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-full sm:w-80 flex items-center px-3 sm:px-4 bg-slate-100 rounded-md transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-400">
      <input
        type="text"
        placeholder="Search Notes"
        value={value}
        onChange={onChange}
        className="w-full text-sm sm:text-xs bg-transparent py-2.5 sm:py-[11px] outline-none"
      />

      {value && (
        <IoMdClose
          className="text-lg sm:text-xl text-slate-500 cursor-pointer mr-2 sm:mr-3 hover:text-black"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black text-base sm:text-lg"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
