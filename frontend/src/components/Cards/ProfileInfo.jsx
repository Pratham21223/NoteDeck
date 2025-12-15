import React from "react";
import { getIntials } from "../../utils/helper";

const ProfileInfo = ({ onLogout, name = "Pratham Ramesh Kataria" }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold">
        {getIntials(name)}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate max-w-[120px] sm:max-w-[180px]">
          {name}
        </p>
        <button
          className="text-xs sm:text-sm text-gray-500 hover:text-blue-600 underline"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
