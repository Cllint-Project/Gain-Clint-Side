/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const SuccessModal = ({ amount, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-sm"
      >
        {/* Main Container */}
        <div className="bg-gradient-to-b from-yellow-400 to-yellow-300 rounded-3xl p-6 shadow-2xl">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-white rounded-full mx-auto -mt-12 shadow-lg flex items-center justify-center">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-inner mt-4 p-6">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Congratulations! 🎉
            </h3>
            <p className="text-center text-gray-600 mb-4">
              You've received a reward of
            </p>
            
            {/* Amount Display */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 text-center">
              <span className="text-4xl font-bold text-green-600">
                ৳{amount}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition-colors"
              onClick={onClose}
            >
              Claim Reward
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-white text-gray-700 font-semibold rounded-xl shadow-md hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              Close
            </motion.button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-green-300 rounded-full animate-ping opacity-75"></div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessModal;