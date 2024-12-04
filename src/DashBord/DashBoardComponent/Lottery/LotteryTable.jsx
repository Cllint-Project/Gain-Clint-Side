
const LotteryTable = ({ lotteries, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-400 to-blue-600">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                Lottery Number
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lotteries?.map((lottery) => (
              <tr
                key={lottery._id}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {lottery.user.username}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {lottery.lotteryNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {lottery.amount} TK
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full ${
                    lottery.isWinner 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {lottery.isWinner ? 'Winner' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                    onClick={() => onDelete(lottery._id, lottery.lotteryNumber)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LotteryTable;