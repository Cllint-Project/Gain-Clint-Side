import { useState } from 'react';
import axios from 'axios';


export const useInvestor = () => {
  const [packages, setPackages] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchInvestorData = async (investorId) => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get(`http://localhost:5000/api/packages/${investorId}`);
      
      setPackages(response.data.data.packages);
      setBalance(response.data.data.balance);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch investor data');
    } finally {
      setLoading(false);
    }
  };

  return {
    packages,
    balance,
    loading,
    error,
    fetchInvestorData
  };
};