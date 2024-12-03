import { useState } from "react";
import { FaTag } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
const CouponForm = () => {
  const [formData, setFormData] = useState({
    code: '',
    expirationMinutes: 10,
    adminId: ''
  });
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      const response = await axiosSecure.post(`/api/users/admin/coupon`, formData);
      
      if (response.data.success) {
        toast.success(response?.data?.message || "Coupon created successfully");
        setFormData({ ...formData, code: '' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create secret coupon');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'expirationMinutes' ? Number(value) : value
    }));
  };

  return (
    <>
      <div className=" md:pt-16 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-indigo-100 p-3 rounded-full">
                <FaTag className="text-blue-600 text-xl" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Create Secret Coupon
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Enter coupon code"
                  className="w-full px-4 py-3 border-2 rounded-lg outline-none transition-all duration-300 
                    border-gray-200 focus:border-blue-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="Enter Your Amount"
                  className="w-full px-4 py-3 border-2 rounded-lg outline-none transition-all duration-300 
                    border-gray-200 focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="expirationMinutes" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration Time (minutes)
                </label>
                <input
                  type="number"
                  id="expirationMinutes"
                  name="expirationMinutes"
                  value={formData.expirationMinutes}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 border-2 rounded-lg outline-none transition-all duration-300 
                    border-gray-200 focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.code}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300
                  ${isSubmitting || !formData.code
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-[0.98]'
                  }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    <span className="ml-2">Creating...</span>
                  </div>
                ) : (
                  "Create Coupon"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              Create a secret coupon with custom expiration time
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponForm;
