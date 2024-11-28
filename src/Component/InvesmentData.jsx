

const InvesmentData = () => {
     return (
          <div className="mt-4 min-h-[300px] w-full max-w-2xl mx-auto px-4">
                <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-lg p-4 mb-6  mx-auto">
          <h1 className="text-xl font-bold text-white text-center">
          
          </h1>
        </div>
      <div className="  flex items-center justify-center p-4 -mt-16">
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 w-full max-w-2xl my-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-400">P-8</h2>
          <div  className="relative inline-flex items-center px-6 py-2 overflow-hidden text-lg font-semibold text-blue-600  border-2 border-blue-600 rounded-full hover:text-white group hover:bg-gray-50">
    <span className="absolute left-0 block w-full h-0 transition-all bg-blue-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
    </span>
    <span className="relative">Daily Claim</span>
</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-800">পরিমাণ:</span>
            <span className=" text-gray-800 font-semibold">800</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-800">বিনিয়োগ চক্র:</span>
            <span className="text-gray-800">35 hari</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-800">দৈনিক আয়:</span>
            <span className="text-gray-800">40.00</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-800">আয়:</span>
            <span className="text-gray-800 w-400 font-semibold">1400</span>
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