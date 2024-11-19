

const ToggleComponent = () => {
     return (
          <div>
               <div className="flex items-center justify-center h-screen">
                    <div className="flex items-center border rounded-full p-1 bg-gray-100">
                         <button className="px-6 py-2 bg-blue-500 text-white rounded-full font-bold">
                              P
                         </button>
                         <button className="px-6 py-2 text-red-500 font-bold">PRO</button>
                    </div>
               </div>
          </div>
     );
};

export default ToggleComponent;