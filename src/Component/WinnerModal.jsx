// WinnerModal.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { XCircle } from 'lucide-react';

const WinnerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [winnerData, setWinnerData] = useState(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      fetchWinnerData();
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const fetchWinnerData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/lottery/weekly-winner');
      setWinnerData(response.data.data);
      setIsOpen(true);
    } catch (error) {
      console.error('Failed to fetch winner data:', error);
    }
  };

  if (!isOpen || !winnerData) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
          <XCircle className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">This Week's Lottery Winner!</h2>
        <div className="text-center">
          <p className="text-lg font-semibold">Winner: {winnerData.username}</p>
          <p className="text-lg">Winning Number: {winnerData.lotteryNumber}</p>
          <p className="text-lg text-green-600">Prize Amount: ${winnerData.prizeAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
