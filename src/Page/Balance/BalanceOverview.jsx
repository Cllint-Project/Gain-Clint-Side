import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import BalanceHistoryList from "./BalanceHistoryList";
import DailyBalanceStats from "./DailyBalanceStats";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import usePagination from "../../Hooks/UsePagination";

const BalanceOverview = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const fetchRecharges = async (page, limit) => {
    let url = `/api/users/getUserBalanceDetails?userId=${user?._id}&page=${page}&limit=${limit}`;
    return await axiosSecure.get(url);
  };

  const {
    data: balanceHistory=[],
    currentPage,
    totalPages,
    handlePageChange,
  } = usePagination(fetchRecharges, 5);

  const shortData = {
    todayBalance: user?.todayBalance,
    todayBonus: user?.todayBonus,
  };
  return (
    <div className="space-y-6">
      <DailyBalanceStats shortData={shortData} />
      <BalanceHistoryList
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        balanceHistory={balanceHistory}
      />
    </div>
  );
};

export default BalanceOverview;
