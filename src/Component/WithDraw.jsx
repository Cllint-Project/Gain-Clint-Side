// import { useContext, useState } from "react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";



const WithDraw = () => {
  // const { id } = useParams(); // cardDetails/:id থেকে ID পেতে
  const location = useLocation();
  const navigate = useNavigate();
  const { machineData = {}, previousPath = '' } = location.state || {};
  // const { user } = useContext(AuthContext);

  console.log('Previous pathname:', previousPath);
  const isCardDetails = previousPath.includes('cardDetails');
  console.log('isCardDetails:', isCardDetails);

  const [rechargeData, setRechargeData] = useState({
    // investor_id: user?._id,
    // investor_name: user?.username,
    recharge_amount: machineData?.investment_amount || 0,
    recharge_option: "Bikash",
    phone_number: "",
    account_number: "",
    balance: 0,
    recharge_status: "pending",
    machine_details: machineData || null,
  });

  const handleInputChange = (e) => {
    setRechargeData({
      ...rechargeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/transaction", { state: { rechargeData } });
  };


     return (
          <div>
        <div className="bg-blue-500 rounded-xl  max-w-xl mx-auto mt-8">
          <h2 className="text-center text-white text-lg font-semibold p-2">WithDraw</h2>
        <div className="p-6 flex items-center justify-between gap-4 -mt-2">
          <div className="w-16 h-16 flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
                      <div>
            <h2 className="text-xl font-semibold text-white">
              {/* {user?.username || 'User'} */}
              Jodhu
            </h2>
            <p className="text-blue-100">
            {/* {user?.phoneNumber} */}
            01784435334384
            </p>
          </div>
          </div>

          <div className='flex items-center gap-10'>
        <div className=" text-white p-4 rounded-lg">
            <h2 className="text-xl font-semibold">0.00TK</h2>
            <p>মোট আয়</p>
          </div>
        </div>
        </div>
      </div>
      <div>
      <div>
      <div className="min-h-screen flex items-center justify-center my-8 -mt-[70px]">
        <div className="bg-white p-8 rounded-lg   border rounded-r-md max-w-lg h- w-full">
          {/* Title ডাইনামিক */}

          <div className="mb-4">
            <label
              htmlFor="accountNumber"
              className="block text-sm font-medium mb-1"
            >
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              name="phone_number"
              onChange={handleInputChange}
              placeholder="Enter account Account Phone number"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:outline-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="customAmount"
              className="block text-sm font-medium mb-1"
            >
              Amount
            </label>
            <input
              type="number"
              id="customAmount"
              name="recharge_amount"
              value={rechargeData.recharge_amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:outline-blue-500 ${
                isCardDetails
                  ? "bg-gray-100 cursor-not-allowed"
                  : ""
              }`}
              readOnly={isCardDetails} // cardDetails পাথের জন্য readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Payment Method
            </label>
            <div className="space-y-2">
              {["Bikash", "Nagad", "Rocket"].map((method) => (
                <label key={method} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="recharge_option"
                    value={method}
                    onChange={handleInputChange}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {isCardDetails ? "Buy Now" : "Recharge Now"}
          </button>
        </div>
      </div>
      <Toaster />
    </div>
    </div>
          </div>
     );
};

export default WithDraw;