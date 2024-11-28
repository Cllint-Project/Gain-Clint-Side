import { useState } from "react";

const ReachargeRecord = () => {
     const [data] = useState([
          { id: 1, name: "John Doe", number: "001", money: "$1,200", status: "Active" },
          { id: 2, name: "Jane Smith", number: "002", money: "$2,500", status: "Pending" },
          { id: 3, name: "Mike Johnson", number: "003", money: "$800", status: "Inactive" },
          { id: 4, name: "Sarah Williams", number: "004", money: "$3,100", status: "Active" },
          { id: 5, name: "Tom Brown", number: "005", money: "$1,700", status: "Pending" },
        ]);
      
        const getStatusColor = (status) => {
          switch (status.toLowerCase()) {
            case 'active':
              return 'bg-green-100 text-green-800';
            case 'pending':
              return 'bg-yellow-100 text-yellow-800';
            case 'inactive':
              return 'bg-red-100 text-red-800';
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
                    Money
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{item.number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{item.money}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
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

export default ReachargeRecord;