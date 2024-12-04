import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/UseAxiosSecure";

const UserLottery = () => {
  const [lotteryNumber, setLotteryNumber] = useState("");
  const [amount, setAmount] = useState("100");
  const axiosSecure = useAxiosSecure()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (lotteryNumber.length !== 4 || !/^\d+$/.test(lotteryNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please enter a 4-digit lottery number'
      });
      return;
    }

    try {
      const response = await axiosSecure.post('/api/lottery/submit', {
        lotteryNumber,
        amount: parseInt(amount)
      });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Lottery ticket submitted successfully!'
        });
        setLotteryNumber("");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to submit lottery ticket'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Weekly Lottery
        </h2>

        <div>
          <label
            htmlFor="lotteryNumber"
            className="block text-gray-700 font-medium"
          >
            Lottery Number (4 digits)
          </label>
          <input
            type="text"
            id="lotteryNumber"
            value={lotteryNumber}
            onChange={(e) => setLotteryNumber(e.target.value.slice(0, 4))}
            placeholder="Enter 4 digit number"
            maxLength="4"
            pattern="\d{4}"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-gray-700 font-medium">
            Amount
          </label>
          <select
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="100">100 TK</option>
            <option value="200">200 TK</option>
            <option value="500">500 TK</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit Lottery
        </button>
      </form>
    </div>
  );
};

export default UserLottery;