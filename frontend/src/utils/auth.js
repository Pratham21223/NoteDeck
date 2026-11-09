// src/utils/auth.js
export const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};
