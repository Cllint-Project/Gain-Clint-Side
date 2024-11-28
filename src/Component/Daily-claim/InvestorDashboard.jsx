import { useState } from 'react';
import { useInvestor } from '../../Hooks/useInvertor';
import { PackageList } from './PackageList';
export const InvestorDashboard = () => {
  const [investorId, setInvestorId] = useState('');
  const { packages, balance, loading, error, fetchInvestorData } = useInvestor();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (investorId) {
      fetchInvestorData(investorId);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={investorId}
            onChange={(e) => setInvestorId(e.target.value)}
            placeholder="Enter Investor ID"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={!investorId || loading}
          >
            {loading ? 'Loading...' : 'View Packages'}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {packages.length > 0 && (
        <PackageList
          packages={packages}
          initialBalance={balance}
          investorId={investorId}
        />
      )}
    </div>
  );
};