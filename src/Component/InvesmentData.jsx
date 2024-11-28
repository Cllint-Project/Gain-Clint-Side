

const InvesmentData = () => {
     return (
          <div>
                <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-lg p-4 mb-6">
          <h1 className="text-xl font-bold text-white text-center">
            ধাপ ১: সুবিধাভোগী একাউন্ট কপি করুন
          </h1>
        </div>
      <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg my-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-400">P-8</h2>
          <button className=" btn btn-sm text-green-400 text-sm">চলমান</button>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-red-400">পরিমাণ:</span>
            <span className="text-yellow-400 font-semibold">800</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-red-400">বিনিয়োগ চক্র:</span>
            <span className="text-white">35 hari</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-red-400">দৈনিক আয়:</span>
            <span className="text-white">40.00</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-red-400">আয়:</span>
            <span className="text-yellow-400 font-semibold">1400</span>
          </div>
        </div>

        <div className="mt-4">
          <img 
            src="https://placehold.co/400x200/1a1a1a/blue?text=P-8" 
            alt="Investment visualization"
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </div>
          </div>
     );
};

export default InvesmentData;