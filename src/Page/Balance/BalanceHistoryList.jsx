/* eslint-disable react/prop-types */

import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import Pagination from "../../common/Pagination";

const getTransactionIcon = (type) => {
  switch (type) {
    case "bonus":
    case "referral":
    case "coupon":
      return <ArrowUpCircle className="w-6 h-6 text-green-500" />;
    case "package":
      return <ArrowDownCircle className="w-6 h-6 text-blue-500" />;
    default:
      return null;
  }
};

const getTransactionColor = (type) => {
  switch (type) {
    case "bonus":
    case "referral":
    case "coupon":
      return "text-green-600";
    case "package":
      return "text-blue-600";
    default:
      return "text-gray-600";
  }
};

const BalanceHistoryList = ({
  balanceHistory,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const sortedHistory = [...balanceHistory].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Transaction History
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {sortedHistory.map((transaction) => (
          <div
            key={transaction._id}
            className="p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              {getTransactionIcon(transaction.type)}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(transaction.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            <span
              className={`font-medium ${getTransactionColor(transaction.type)}`}
            >
              {transaction.amount.toLocaleString()} TK
            </span>
          </div>
        ))}
      </div>

      <div className="py-10">
        {balanceHistory?.length > 0 ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        ) : (
          <div className="text-center py-4">No recharges found</div>
        )}
      </div>
    </div>
  );
};

export default BalanceHistoryList;
