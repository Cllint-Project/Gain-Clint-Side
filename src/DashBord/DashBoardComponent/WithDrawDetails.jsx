import { useState } from "react";


const WithDrawDetails = () => {
     const [tableData] = useState([
          {
            id: 1,
            name: "John Doe",
            number: "#123456",
            withdrawTk: 5000,
            status: "Pending"
          },
          {
            id: 2,
            name: "Jane Smith",
            number: "#789012",
            withdrawTk: 3500,
            status: "Completed"
          },
          {
            id: 3,
            name: "Mike Johnson",
            number: "#345678",
            withdrawTk: 7800,
            status: "Processing"
          },
          {
            id: 4,
            name: "Sarah Williams",
            number: "#901234",
            withdrawTk: 2300,
            status: "Pending"
          }
        ]);
        const getStatusColor = (status) => {
          switch (status.toLowerCase()) {
            case 'completed':
              return 'bg-green-100 text-green-800';
            case 'pending':
              return 'bg-yellow-100 text-yellow-800';
            case 'processing':
              return 'bg-blue-100 text-blue-800';
            default:
              return 'bg-gray-100 text-gray-800';
          }
        };
     return (
          <div>
                  <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-purple-600 to-indigo-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Number
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Withdraw Tk
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((row) => (
                  <tr 
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center text-white font-semibold">
                            {row.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{row.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{row.number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">৳{row.withdrawTk.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
          </div>
     );
};

export default WithDrawDetails;