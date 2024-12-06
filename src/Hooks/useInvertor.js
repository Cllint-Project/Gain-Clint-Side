import { useState } from 'react';
import axios from 'axios';
import UseAxiosPublic from './UseAxiosPublic';


export const useInvestor = () => {
  const [packages, setPackages] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const axiosPublic = UseAxiosPublic();

  const fetchInvestorData = async (investorId) => {
    try {
      setLoading(true);
      setError('');

      const response = await axiosPublic.get(`/api/packages/${investorId}`);
      console.log(response, investorId)
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