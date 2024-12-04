/* eslint-disable react/prop-types */

import { Wallet, Gift } from 'lucide-react';
import BalanceCard from './BalanceCard';

const DailyBalanceStats = ({ balanceHistory }) => {
  // Get today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter today's transactions
  const todayTransactions = balanceHistory?.filter(record => {
    const recordDate = new Date(record.timestamp);
    return recordDate >= today;
  });

  // Calculate today's total balance
  const todayBalance = todayTransactions.reduce((sum, record) => sum + record.amount, 0);

  // Calculate today's bonus (referral + coupon)
  const todayBonus = todayTransactions
    .filter(record => ['referral', 'coupon'].includes(record.type))
    .reduce((sum, record) => sum + record.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BalanceCard 
        title="Today's Balance" 
        amount={todayBalance}
        icon={Wallet}
      />
      <BalanceCard 
        title="Today's Bonus" 
        amount={todayBonus}
        icon={Gift}
      />
    </div>
  );
};

export default DailyBalanceStats;