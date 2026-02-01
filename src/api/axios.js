import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

/* 🔐 REQUEST INTERCEPTOR (attach token) */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* 🚨 RESPONSE INTERCEPTOR (handle 401) */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      // SPA-safe redirect
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default api;
