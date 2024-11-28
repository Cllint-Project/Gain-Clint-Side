import { useState } from 'react';
import { ClaimButton } from './ClaimButton';

export const PackageList = ({ packages, initialBalance, investorId }) => {
  const [balance, setBalance] = useState(initialBalance);

  return (
    <div>
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold">Current Balance</h2>
        <p className="text-3xl font-bold text-blue-600">${balance.toFixed(2)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div key={pkg._id} className="border rounded-lg p-4 shadow-md">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Package Details</h3>
              <p>Duration: {pkg.machine_details.investment_duration} days</p>
              <p>Daily Income: ${pkg.machine_details.daily_income}</p>
            </div>
            
            <ClaimButton
              packageId={pkg._id}
              investorId={investorId}
              onClaimSuccess={(newBalance) => setBalance(newBalance)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};