import { useState } from 'react';
import { FaUserShield, FaUser, FaSort } from 'react-icons/fa';

const UserManagement = () => {
     const [data] = useState([
          { id: 1, name: 'John Doe', number: '001' },
          { id: 2, name: 'Jane Smith', number: '002' },
          { id: 3, name: 'Mike Johnson', number: '003' },
          { id: 4, name: 'Sarah Williams', number: '004' },
          { id: 5, name: 'David Brown', number: '005' },
        ]);
     return (
          <div>
  <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold tracking-wider whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      Name
                      <FaSort className="text-gray-300 hover:text-white cursor-pointer" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left font-semibold tracking-wider whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      Number
                      <FaSort className="text-gray-300 hover:text-white cursor-pointer" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold tracking-wider whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-gray-100 transition-colors duration-200`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">#{item.number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                          <FaUserShield className="mr-2" />
                          Admin
                        </button>
                        <button
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                        >
                          <FaUser className="mr-2" />
                          User
                        </button>
                      </div>
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

export default UserManagement;