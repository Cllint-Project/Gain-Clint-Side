import BalanceHistoryList from "./BalanceHistoryList";
import DailyBalanceStats from "./DailyBalanceStats";


const BalanceOverview = ({ balanceHistory }) => {
  return (
    <div className="space-y-6">
      <DailyBalanceStats />
      <BalanceHistoryList balanceHistory={balanceHistory} />
    </div>
  );
};

export default BalanceOverview;