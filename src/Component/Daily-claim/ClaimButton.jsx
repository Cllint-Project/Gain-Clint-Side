import { useState } from 'react';
import axios from 'axios';

export const ClaimButton = ({ packageId, investorId, onClaimSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClaim = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.post('http://localhost:5000/api/claims/claim-daily', {
        investor_id: investorId,
        package_id: packageId
      });

      if (response.data.success) {
        onClaimSuccess(response.data.data.newBalance);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to claim daily income');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClaim}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Claiming...' : 'Claim Daily Income'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};