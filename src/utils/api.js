import axios from 'axios';

// const BASE_URL = 'https://gain-server-side-production.up.railway.app/api/users';
const BASE_URL = 'http://localhost:5000/api/users';

export const submitRecharge = async (data) => {
  const endpoint = data.machine_details 
    ? `${BASE_URL}/submit-invest`
    : `${BASE_URL}/submit-recharge`;
    console.log(data,10)
  const response = await axios.post(endpoint, data);
  return response.data;
};


export const getTeamMembers = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/team/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};