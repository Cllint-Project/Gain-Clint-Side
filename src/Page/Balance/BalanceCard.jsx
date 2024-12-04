
const BalanceCard = ({ title, amount, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {amount.toLocaleString()} TK
          </p>
        </div>
        {Icon && (
          <div className="bg-blue-100 p-3 rounded-full">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceCard;