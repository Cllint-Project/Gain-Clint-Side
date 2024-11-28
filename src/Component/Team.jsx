

const Team = () => {
     return (
          <div>
 <div className=" mx-5 mr-5 mt-2 min-h-screen ">
     <div className="bg-blue-500">
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
            <h2 className="text-xl font-semibold text-gray-200">Your Name</h2>
            <p className="text-gray-200">Numbar</p>
          </div>
        </div>
      </div>
            {/* Top Section */}
            <div className=" p-6 mt-4">
        <div className="max-w-6xl  flex flex-wrap gap-4 mx-3 text-center">
          {/* Card 1 */}
          <div className=" text-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold">0.00TK</h2>
            <p>মোট আয়</p>
          </div>
          {/* Card 2 */}
          <div className=" text-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold">0.00TK</h2>
            <p>আজ</p>
          </div>
          {/* Card 3 */}
          <div className=" text-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold">0.00TK</h2>
            <p>গতকাল</p>
          </div>
        </div>
      </div>
     </div>
      {/* Middle Section */}
      <div className="max-w-6xl  mt-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
          {/* Left Section */}
          <div className="flex gap-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">0</h3>
              <p className="text-gray-500">Total Income</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">0</h3>
              <p className="text-gray-500">আজ বোনাস</p>
            </div>
          </div>
          {/* Right Section */}
          <div className="flex flex-col flex-wrap items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="Share Icon"
              className="h-12 w-12"
            />
            <p className="text-gray-500 text-center mt-2">মেয়ুন বন্ধুদের আমন্ত্রণ</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-6xl  mt-6 my-44">
        <div className="bg-white shadow-lg rounded-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">টিম তালিকা</h3>
          <p className="text-gray-500 mt-2">এখানে আপনার টিমের তথ্য দেখানো হবে।</p>
        </div>
      </div>
    </div>
          </div>
     );
};

export default Team;