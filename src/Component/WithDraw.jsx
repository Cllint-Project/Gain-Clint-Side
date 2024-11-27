import React from 'react';

const WithDraw = () => {
     return (
          <div>
          <div className="bg-gray-100 min-h-screen mt-3 ">
           {/* Profile Section */}
      <div >
        <div className="max-w-6xl  p-6 flex items-center gap-4">
          {/* Profile Image */}
          <div className="w-16 h-16">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {/* Profile Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Your Name</h2>
            <p className="text-gray-800">Numbar</p>
          </div>
        </div>
      </div>
            {/* Top Section */}
            <div className=" p-6 mt-4">
        <div className="max-w-6xl  flex flex-wrap gap-4 mx-3 text-center">
          {/* Card 1 */}
          <div className=" text-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">0.00TK</h2>
            <p>মোট আয়</p>
          </div>
          {/* Card 2 */}
          <button className='btn bg-blue-600 -mt-2 text-white'>WithDrow</button>
        </div>
      </div>
     </div>
          </div>
     );
};

export default WithDraw;