import { useState } from 'react'
import { FaTag, FaCheck, FaTimes } from 'react-icons/fa'

const Cuppon = () => {
     const [coupon, setCoupon] = useState('')
     const [isValid, setIsValid] = useState(null)
     const [isApplying, setIsApplying] = useState(false)
   
     const handleSubmit = (e) => {
       e.preventDefault()
       setIsApplying(true)
   
       // Simulate API call to validate coupon
       setTimeout(() => {
         // For demo: consider coupon valid if it's "SAVE50"
         const valid = coupon.toUpperCase() === 'SAVE50'
         setIsValid(valid)
         setIsApplying(false)
       }, 1500)
     }
     return (
          <div>
                <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-indigo-100 p-3 rounded-full">
              <FaTag className="text-indigo-600 text-xl" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Apply Coupon Code
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value)
                  setIsValid(null)
                }}
                placeholder="Enter coupon code"
                className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all duration-300 
                  ${isValid === true ? 'border-green-500 bg-green-50' : 
                    isValid === false ? 'border-red-500 bg-red-50' : 
                    'border-gray-200 focus:border-indigo-500'}`}
              />
              {isValid !== null && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isValid ? (
                    <FaCheck className="text-green-500 text-xl" />
                  ) : (
                    <FaTimes className="text-red-500 text-xl" />
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!coupon || isApplying}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300
                ${!coupon || isApplying
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-[0.98]'}`}
            >
              {isApplying ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  <span className="ml-2">Applying...</span>
                </div>
              ) : (
                'Apply Coupon'
              )}
            </button>
          </form>

          {isValid === true && (
            <div className="mt-4 p-4 bg-green-100 rounded-lg">
              <p className="text-green-700 text-center">
                Coupon successfully applied! You got 50% off.
              </p>
            </div>
          )}

          {isValid === false && (
            <div className="mt-4 p-4 bg-red-100 rounded-lg">
              <p className="text-red-700 text-center">
                Invalid coupon code. Please try again.
              </p>
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            Try the code "SAVE50" for a 50% discount
          </div>
        </div>
      </div>
    </div>
          </div>
     );
};

export default Cuppon;