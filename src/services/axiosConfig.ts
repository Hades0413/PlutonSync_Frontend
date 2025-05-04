// src/services/axiosConfig.ts
import axios from "axios";

// Configuración base
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

// Interceptor para errores
axios.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;

    if (status === 401) window.location.href = "/unauthorized";
    else if (status === 403) window.location.href = "/forbidden";
    else if (status === 500) window.location.href = "/server-error";

    return Promise.reject(error);
  }
);

export default axios;
