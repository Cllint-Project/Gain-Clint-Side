/* eslint-disable react/prop-types */

import { Wallet, Gift } from "lucide-react";
import BalanceCard from "./BalanceCard";


const DailyBalanceStats = ({shortData}) => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BalanceCard
        title="আজকের ব্যালেন্স"
        amount={shortData?.todayBalance}
        icon={Wallet}
      />
      <BalanceCard
        title="আজকের বোনাস"
        amount={shortData?.todayBonus}
        icon={Gift}
      />
    </div>
  );
};

export default DailyBalanceStats;
