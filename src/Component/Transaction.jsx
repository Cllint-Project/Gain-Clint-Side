

const Transaction = () => {
     return (
          <div>
               <div className="max-w-lg mx-auto p-4 container my-12">
                    <h1 className="text-lg font-bold text-white bg-gradient-to-r from-red-500 to-red-700 py-3 px-5 rounded-lg text-center shadow-md">
                         ধাপ 1: সুবিধাভোগী একাউন্ট কপি করুন
                    </h1>

                    <div className="mt-4 mx-2">
                    <input 
                      className="block text-left text-gray-700 border border-gray-300 focus:outline-none rounded-lg font-medium mb-2 p-2 w-full"
                    type="text"
                    placeholder="Account NUmbar" 
                    />
                    </div>
                    <div className="mt-4 mx-2">
                    <input 
                     className="block text-left text-gray-700 border border-gray-300 focus:outline-none rounded-lg font-medium mb-2 p-2 w-full"
                    type="text"
                    placeholder="Payment Channel" 
                    />
                    </div>
                    <div
                     className="border-2 border-red-400  h-[500px] w-full m-5 max-w-lg  bg-no-repeat bg-origin-content"
                    style={{
                         backgroundImage:
                              "url('https://i.ibb.co.com/w45WF8r/Capture7.jpg')",
                    }}
                    >
                    </div>
               
                    <div className="mt-4 mx-5">
                    <input 
                      className="block text-left text-gray-700 border border-gray-300 focus:outline-none rounded-lg font-medium mb-2 p-2 w-full"
                    type="text"
                    placeholder="Transection Numbar" 
                    />
                    </div>
                    <div className="flex justify-between">
                    <button
                    className="btn ml-3 w-[210px]"
                    >
                         Dellete
                    </button>
                    <button
                    className="btn mr-3 w-[210px]"
                    >
                         Confirm
                    </button>
                    </div>
               </div>
          </div>
     );
};

export default Transaction;