


const MachineDetails = () => {
     const data = [
          { id: 1, name: "John Doe", accountNumber: "ACC-12345", machineName: "Machine A" },
          { id: 2, name: "Jane Smith", accountNumber: "ACC-67890", machineName: "Machine B" },
          { id: 3, name: "Alice Johnson", accountNumber: "ACC-11223", machineName: "Machine C" },
          { id: 4, name: "Robert Brown", accountNumber: "ACC-44556", machineName: "Machine D" },
        ];
      
        const handleUpdate = (id) => {
          alert(`Update action triggered for ID: ${id}`);
        };
      
        const handleDelete = (id) => {
          alert(`Delete action triggered for ID: ${id}`);
        };
        const handleUpload = (id) => {
          alert(`Upload action triggered for ID: ${id}`);
        };
     return (
          <div>
 <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-purple-500 to-indigo-500">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                    Account Number
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                    Machine Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.accountNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.machineName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 flex gap-2  flex-grow">
                      <button
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500/90 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        onClick={() => handleUpdate(item.id)}
                      >
                        Update
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500/90 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-500/90 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        onClick={() => handleUpload(item.id)}
                      >
                        Upload
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

export default MachineDetails;