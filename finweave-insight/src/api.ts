// src/api.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // your backend URL

export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (credentials: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
