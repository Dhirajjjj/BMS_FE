import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const getTransactions = async (accountData) => {

  try {
    const response = await axios.get(`${BASE_URL}/transaction-by-holder-id?accountId=${accountData}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};