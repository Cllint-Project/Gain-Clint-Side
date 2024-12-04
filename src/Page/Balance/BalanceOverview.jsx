import BalanceHistoryList from "./BalanceHistoryList";
import DailyBalanceStats from "./DailyBalanceStats";


const BalanceOverview = ({ balanceHistory }) => {
  return (
    <div className="space-y-6">
      <DailyBalanceStats balanceHistory={balanceHistory} />
      <BalanceHistoryList balanceHistory={balanceHistory} />
    </div>
  );
};

export default BalanceOverview;