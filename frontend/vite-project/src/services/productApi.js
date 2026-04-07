import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

// 🔐 token auto attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const addProduct = (data) => API.post("/", data);
export const getProducts = () => API.get("/");
export const updateProduct = (id, data) => API.put(`/${id}`, data);
export const deleteProduct = (id) => API.delete(`/${id}`);
