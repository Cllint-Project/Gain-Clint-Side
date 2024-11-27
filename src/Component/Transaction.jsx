import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {  PencilIcon, X } from 'lucide-react';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function TransactionPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { rechargeData: initialRechargeData } = location.state || {};

//   const [rechargeData, setRechargeData] = useState(initialRechargeData);
//   const [transactionId, setTransactionId] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [newPhoneNumber, setNewPhoneNumber] = useState(rechargeData?.phone_number || '');

//   const handleUpdatePhoneNumber = () => {
//     setRechargeData({
//       ...rechargeData,
//       phone_number: newPhoneNumber
//     });
//     setShowModal(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const finalData = {
//       ...rechargeData,
//       transaction_id: transactionId
//     };

    
//     try {
//          console.log(finalData)
//       const response = await axios.post('https://gain-server-side-production.up.railway.app/api/users/submit-recharge', finalData);
      
//       if (response.status === 200) {
//         alert('Transaction submitted successfully!');
//      //    navigate('/');
//       }
//     } catch (error) {
//       alert('Error submitting transaction. Please try again.');
//       console.error('Error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


const location = useLocation();
  const navigate = useNavigate();
  const { rechargeData: initialRechargeData } = location.state || {};

  const [rechargeData, setRechargeData] = useState(initialRechargeData);
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState(rechargeData?.phone_number || '');

  const handleUpdatePhoneNumber = () => {
    setRechargeData({
      ...rechargeData,
      phone_number: newPhoneNumber
    });
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format the data to match the schema
    const formattedMachineDetails = {
      machine_name: rechargeData.machine_details.machine_name,
      investment_amount: rechargeData.machine_details.investment_amount,
      investment_duration: Number(rechargeData.machine_details.investment_duration),
      daily_income: rechargeData.machine_details.daily_income,
      total_income: rechargeData.machine_details.total_income,
      invest_rate: rechargeData.machine_details.invest_rate,
      invest_limit: rechargeData.machine_details.invest_limit,
      vipStatus: rechargeData.machine_details.vipStatus,
      machine_image: rechargeData.machine_details.machine_image
    };

    const finalData = {
      recharge_amount: rechargeData.recharge_amount,
      recharge_option: rechargeData.recharge_option,
      phone_number: rechargeData.phone_number,
      balance: 0, // Default value as per schema
      recharge_status: 'pending', // Default value as per schema
      transaction_id: transactionId,
      machine_details: formattedMachineDetails
    };

    try {

     // console.log(finalData)
      const response = await axios.post('https://gain-server-side-production.up.railway.app/api/users/submit-recharge', finalData);
      console.log(response.data)
      if (response.status === 200) {
        toast.success('Transaction submitted successfully!');
        setTimeout(() => {
          navigate('/');
        },2000)
      }
    } catch (error) {
      console.error('Error details:', error.response?.data);
      toast.alert('Error submitting transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="pb-20 bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-lg p-4 mb-6">
          <h1 className="text-xl font-bold text-white text-center">
            ধাপ ১: সুবিধাভোগী একাউন্ট কপি করুন
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Details Section */}
          <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  readOnly
                  value={rechargeData?.phone_number || ''}
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                  placeholder="Account number"
                />
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="ml-2 p-2 text-blue-600 hover:text-blue-700"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recharge Option
              </label>
              <input
                type="text"
                readOnly
                value={rechargeData?.recharge_option || ''}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recharge Amount
              </label>
              <input
                type="text"
                readOnly
                value={`$${rechargeData?.recharge_amount || ''}`}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Payment Instructions Image */}
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://i.ibb.co.com/w45WF8r/Capture7.jpg"
              alt="Payment Instructions"
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Transaction ID Section */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction Number
            </label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your transaction number"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setTransactionId('')}
              className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Confirm'}
            </button>
          </div>
        </form>
      </div>

      {/* Update Phone Number Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Update Phone Number</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Phone Number
              </label>
              <input
                type="tel"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter new phone number"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePhoneNumber}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionPage;