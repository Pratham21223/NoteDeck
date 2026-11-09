import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Password = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  autoComplete = "current-password",
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}                 // ✅ dynamic id
        name={name}             // ✅ dynamic name
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Enter your password"}
        type={isShowPassword ? "text" : "password"}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 pr-10"
        autoComplete={autoComplete}
      />

      <span
        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
        onClick={() => setIsShowPassword(!isShowPassword)}
      >
        {isShowPassword ? (
          <FaRegEye size={18} className="text-blue-500" />
        ) : (
          <FaRegEyeSlash size={18} className="text-gray-400" />
        )}
      </span>
    </div>
  );
};

export default Password;
