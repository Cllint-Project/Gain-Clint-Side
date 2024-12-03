import { useState } from "react";

const UserLottary = () => {
     const [lotteryNumber, setLotteryNumber] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lottery Number:", lotteryNumber);
    console.log("Date:", date);
    alert("Lottery Submitted!");
  };

     return (
          <div>
      <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Lottery Form</h2>
        
        {/* Lottery Number Field */}
        <div>
          <label htmlFor="lotteryNumber" className="block text-gray-700 font-medium">
            Lottery Number
          </label>
          <input
            type="text"
            id="lotteryNumber"
            value={lotteryNumber}
            onChange={(e) => setLotteryNumber(e.target.value)}
            placeholder="Enter your lottery number"
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        {/* Date Field */}
        <div>
          <label htmlFor="date" className="block text-gray-700 font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
          </div>
     );
};

export default UserLottary;