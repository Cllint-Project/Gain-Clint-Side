 export const TeamStats = ({ userData }) => {
    const stats = [
      { label: 'মোট আয়', value: `${userData?.balance || 0}TK` },
      { label: 'আজ', value: '0.00TK' },
      { label: 'গতকাল', value: '0.00TK' },
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