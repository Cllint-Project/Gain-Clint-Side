/* eslint-disable react/prop-types */
 export const TeamStats = ({ shortData }) => {
    const stats = [
      { label: 'মোট ব্যালেন্স', value: `${shortData?.balance || 0}TK` }
    ];
  
    return (
      <div className="bg-blue-500 rounded-b-lg mb-6">
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h2 className="text-xl font-semibold text-white">{stat.value}</h2>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };