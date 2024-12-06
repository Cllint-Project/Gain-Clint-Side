import { useState, useEffect } from 'react';

const usePagination = (fetchFunction, itemsPerPage = 10) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(Date.now());

  useEffect(() => {
    fetchData();
  }, [currentPage, lastFetchTime]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchFunction(currentPage, itemsPerPage);
      setData(response.data.data || []);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));

      console.log(`data ${response.data.data} %%%%%%% total ${response.data.total}`)
      console.log(response,22)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const refresh = () => {
    setLastFetchTime(Date.now());
  };

  return {
    data,
    currentPage,
    totalPages,
    loading,
    handlePageChange,
    refresh
  };
};

export default usePagination;