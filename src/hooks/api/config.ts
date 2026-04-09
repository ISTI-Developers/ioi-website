import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const API_BASE_URL = import.meta.env.VITE_SERVER;

if (!API_BASE_URL) {
  throw new Error("VITE_SERVER is not defined");
}

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 60000,
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    toast.error(
      error.message === "Network Error"
        ? "Cannot connect to the server."
        : error.message
    );

    return Promise.reject(error);
  }
);

export default api;
