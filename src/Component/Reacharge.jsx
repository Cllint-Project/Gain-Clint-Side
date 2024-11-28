import { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";

const Recharge = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { machineData } = location.state || {};
  const { user } = useContext(AuthContext);
  // console.log(user?._id);
  const [rechargeData, setRechargeData] = useState({
    investor_id: user?._id,
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
      <div className="min-h-screen flex items-center justify-center my-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg h-1/2 w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Recharge Form</h2>

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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
              defaultValue={machineData?.investment_amount || 0}
              onChange={handleInputChange}
              placeholder="Enter amount"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
            Recharge Now
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Recharge;
