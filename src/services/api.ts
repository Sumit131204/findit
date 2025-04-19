import axios from "axios";
import { Item, User } from "../types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      return response.data.user;
    } catch (error) {
      throw error;
    }
  },

  register: async (
    name: string,
    email: string,
    password: string,
    phoneNumber?: string
  ) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        phoneNumber,
      });
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      return response.data.user;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
  },
};

// Items API
export const itemsAPI = {
  getItems: async (): Promise<Item[]> => {
    try {
      const response = await api.get("/items");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createItem: async (item: Omit<Item, "id">): Promise<Item> => {
    try {
      const response = await api.post("/items", item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  ringItem: async (id: string): Promise<Item> => {
    try {
      const response = await api.post(`/items/${id}/ring`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
