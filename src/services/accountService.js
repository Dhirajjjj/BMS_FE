import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const getAccounts = async (accountData) => {

  try {
    const response = await axios.get(`${BASE_URL}/account-by-holder-id?accountId=${accountData}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

export const accountDeposit = async (data) => {
  try {
    let body = {};
    const response = await axios.post(`${BASE_URL}/account/deposit?accountId=${data.accountId}&amount=${data.amount}`, body);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const accountWithdraw = async (data) => {
  try {
    let body = {};
    const response = await axios.post(`${BASE_URL}/account/withdraw?accountId=${data.accountId}&amount=${data.amount}`, body);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const createAccount = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/account`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};