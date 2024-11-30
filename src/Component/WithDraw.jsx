import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { VITE_BASE_URL } from "../baseUrl";

const Withdraw = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [withdrawData, setWithdrawData] = useState({
    account_number: '',
    amount: "",
    payment_method: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${VITE_BASE_URL}/api/users/getUser/${user._id}`
        );
        const userData = response?.data?.data;
        setUserData(userData)

        const account_number = userData?.phoneNumber;
        setWithdrawData((prev) => ({
          ...prev,
          account_number,
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
       
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setWithdrawData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // if (
    //   !withdrawData.account_number ||
    //   !withdrawData.amount ||
    //   !withdrawData.payment_method
    // ) {
    //   toast.error("Please fill in all fields");
    //   return;
    // }
    setLoading(true);
    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/api/users/withdraw`,
        {
          user_id: user?._id,
          amount: Number(withdrawData.amount),
          payment_method: withdrawData.payment_method,
          account_number: withdrawData.account_number,
        }
      );
      if (response.data.success === true) {
        toast.success("Withdrawal request submitted successfully");
        setWithdrawData({
          account_number: "",
          amount: "",
          payment_method: "",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit withdrawal request"
      );
    } finally {
      setLoading(false);
    }
  };

  console.log(userData)

  return (
    <div>
      <div className="bg-blue-500 rounded-xl max-w-xl mx-auto mt-8">
        <h2 className="text-center text-white text-lg font-semibold p-2">
          Withdraw
        </h2>
        <div className="p-6 flex items-center justify-between gap-4 -mt-2">
          <div className="w-16 h-16 flex items-center gap-2">
            <img
              src={
                userData?.profileImage ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
            <div>
              <h2 className="text-xl font-semibold text-white">
                {userData?.username || "User"}
              </h2>
              <p className="text-blue-100">
                {userData?.phoneNumber || "No phone number"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="text-white p-4 rounded-lg">
              <h2 className="text-xl font-semibold">
                {userData?.balance || "0.00"}TK
              </h2>
              <p>মোট আয়</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="min-h-screen flex items-center justify-center my-8 -mt-[70px]">
          <div className="bg-white p-8 rounded-lg border rounded-r-md max-w-lg w-full">
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
                name="account_number"
                value={userData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter account Account Phone number"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:outline-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium mb-1"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={withdrawData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-blue-500 focus:outline-blue-500"
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
                      name="payment_method"
                      value={method}
                      onChange={handleInputChange}
                      checked={withdrawData.payment_method === method}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? "Processing..." : "Withdraw Now"}
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Withdraw;
