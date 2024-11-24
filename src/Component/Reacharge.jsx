import { useState } from "react";


const Reacharge = () => {
     const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("xlpay");

  const predefinedAmounts = [1000, 1800, 3000, 9500, 16500];

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(""); // Clear custom amount
  };

  const handleCustomAmountChange = (e) => {
    setSelectedAmount("");
    setCustomAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rechargeAmount = selectedAmount || customAmount;
    if (!rechargeAmount) {
      alert("Please select or enter an amount.");
      return;
    }
    alert(`Recharge of ${rechargeAmount} TK via ${selectedPayment} initiated!`);
  };
     return (
          <div>
               <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Recharge Form</h2>

        {/* Amount Selection */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {predefinedAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleAmountClick(amount)}
              className={`py-2 px-4 rounded-lg text-sm ${
                selectedAmount === amount
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {amount} TK
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <div className="mb-4">
          <label htmlFor="customAmount" className="block text-sm font-medium mb-1">
            Other Amount
          </label>
          <input
            type="number"
            id="customAmount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Payment Options */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Payment Method</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value="xlpay"
                checked={selectedPayment === "xlpay"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="text-blue-500 focus:ring-blue-500"
              />
              <span>XL Pay</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value="wakapay"
                checked={selectedPayment === "wakapay"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="text-blue-500 focus:ring-blue-500"
              />
              <span>Waka Pay</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value="onepay"
                checked={selectedPayment === "onepay"}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="text-blue-500 focus:ring-blue-500"
              />
              <span>One Pay</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Recharge Now
        </button>
      </div>
    </div>
          </div>
     );
};

export default Reacharge;