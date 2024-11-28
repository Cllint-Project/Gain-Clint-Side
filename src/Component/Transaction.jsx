import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PencilIcon, X } from 'lucide-react';
import { formatRechargeData } from '../utils/formatRechargeData';
import { submitRecharge } from '../utils/api';

function Transaction() {
  const location = useLocation();
  const navigate = useNavigate();
  const { rechargeData: initialRechargeData } = location.state || {};

  const [rechargeData, setRechargeData] = useState(initialRechargeData);
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState(rechargeData?.phone_number || '');
  const [adminNumber, setNewAdminNumber] = useState('');

  const handleUpdatePhoneNumber = () => {
    setRechargeData({
      ...rechargeData,
      admin_number: adminNumber
    });
    setShowModal(false);
  };
  console.log(adminNumber,26)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formattedData = formatRechargeData(rechargeData,adminNumber, transactionId);
      const response = await submitRecharge(formattedData);
      
      if (response) {
        alert('Transaction submitted successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error details:', error.response?.data);
      alert('Error submitting transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-20 bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-lg p-4 mb-6">
          <h1 className="text-xl font-bold text-white text-center">
            ধাপ ১: সুবিধাভোগী একাউন্ট কপি করুন
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Number
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  // readOnly
                  name='admin_number'
                  defaultValue={adminNumber}
                  onChange={(e)=>setNewAdminNumber(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                  placeholder="Admin account number"
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

          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://i.ibb.co.com/w45WF8r/Capture7.jpg"
              alt="Payment Instructions"
              className="w-full h-[500px] object-cover"
            />
          </div>

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
                onChange={(e) => setNewAdminNumber(e.target.value)}
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

export default Transaction;