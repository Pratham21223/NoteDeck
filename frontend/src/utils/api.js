// src/utils/api.js
import axios from "axios";
import { backendPort } from "./helper";

const api = axios.create({
  baseURL: backendPort,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
