import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
const Lottary = () => {
     const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [data, setData] = useState([
    { id: 1, userName: "John Doe", date: "2024-12-01", lotteryNumber: "L-1001" },
    { id: 2, userName: "Jane Smith", date: "2024-12-02", lotteryNumber: "L-1002" },
    { id: 3, userName: "Alice Johnson", date: "2024-12-03", lotteryNumber: "L-1003" },
  ]);

  // Filter data by lottery number
  React.useEffect(() => {
    const lowercasedFilter = searchText.toLowerCase();
    const filtered = data.filter((item) =>
      item.lotteryNumber.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredData(filtered);
  }, [searchText, data]);

  // Handle delete action
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };
  const handleSelect = () => {
     alert(`Upload action triggered for ID: ${id}`);
  };

     return (
     <div>
<div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Box */}
        <div className="mb-4 mr-60 flex items-center justify-center gap-4">
  {/* Search Bar */}
  <div className="relative flex-1 max-w-xs">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
      <FaSearch />
    </span>
    <input
      type="text"
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      placeholder="Search by Lottery Number..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  </div>

  {/* Button */}
  <button
   onClick={() => handleSelect(item.id)}
    className="w-32 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
  >
    Select
  </button>
</div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-400 to-blue-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                    User Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                    Lottery Number
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-100 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">{item.userName}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.lotteryNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No matching data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
     </div>
     );
};

export default Lottary;