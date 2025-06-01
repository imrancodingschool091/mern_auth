// api.js
import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/auth",
  withCredentials: true,
});

export const userRegister = (userData) => api.post("/register", userData);
export const userLogin = (userData) => api.post("/login", userData);
export const userLogout = () => api.get("/logout");
export const user = () => api.get("/user");
