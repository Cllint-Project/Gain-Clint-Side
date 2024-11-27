

const PersonalInformation = () => {
     return (
          <div>
 <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-blue-500 text-white text-center p-4">
        <h1 className="text-xl font-bold">ব্যক্তিগত কেন্দ্র</h1>
      </header>

      {/* Profile Section */}
      <div className="bg-blue-500 text-white p-6 rounded-b-lg">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="rounded-full"
            />
          </div>
          <div className="flex justify-between w-full mt-4 gap-4">
            <div className="flex-1 text-center">
              <p className="text-sm">অবশিষ্ট ব্যালেন্স</p>
              <p className="text-lg font-bold">0.00TK</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-sm">আয়</p>
              <p className="text-lg font-bold">0.00TK</p>
            </div>
          </div>
          <div className="flex mt-6 gap-4">
            <button className="bg-red-500 px-4 py-2 rounded text-white w-full sm:w-auto">
              উত্তোলন
            </button>
            <button className="bg-green-500 px-4 py-2 rounded text-white w-full sm:w-auto">
              রিচার্জ
            </button>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="bg-white mt-6 shadow-sm rounded-lg mx-4 flex-grow">
        <div className="flex justify-around border-b">
          <div className="p-4 text-center">
            <p className="text-blue-500">মিনিটের রিপোর্ট</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-blue-500">অবধান শিখুন</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-blue-500">অনলাইন সেবা</p>
          </div>
        </div>
        <ul>
          <li className="flex items-center justify-between p-4 border-b">
            <span>ভাউচার ট্রে</span>
            <span>&rarr;</span>
          </li>
          <li className="flex items-center justify-between p-4 border-b">
            <span>দান করুন</span>
            <span>&rarr;</span>
          </li>
          <li className="flex items-center justify-between p-4 border-b">
            <span>আমার পুরস্কার</span>
            <span>&rarr;</span>
          </li>
          <li className="flex items-center justify-between p-4 border-b">
            <span>চার্জ রেকর্ড</span>
            <span>&rarr;</span>
          </li>
        </ul>
      </div>

      {/* Logout Section */}
      <div className="text-center mt-6 mb-4">
        <button className="bg-blue-500 text-white px-6 py-2 rounded">
          বর্তমান অ্যাকাউন্ট থেকে লগআউট
        </button>
      </div>
    </div>
          </div>
     );
};

export default PersonalInformation;