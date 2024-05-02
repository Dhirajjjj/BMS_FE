import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';

export const registerUser = async (userData) => {

  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};