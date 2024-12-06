import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import Swal from 'sweetalert2';
import { Briefcase, Phone, Upload, User } from "lucide-react";
import useAxiosSecure from '../Hooks/UseAxiosSecure';


const Profile = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    profileImage: '',
    role: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      try {
        const response = await axiosSecure.get(
          `/api/users/getUser/${user._id}`
        );
        const userData = response?.data?.data;
        
        setFormData({
          username: userData?.username || '',
          phoneNumber: userData?.phoneNumber || '',
          profileImage: userData?.profileImage || '',
          role: userData?.role || ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch user data',
          icon: 'error',
          confirmButtonColor: '#d33',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?._id,axiosSecure]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosSecure.put(
        `/api/users/profile`,
        {
          userId: user._id,
          ...formData,
        }
      );

      if (response.data.status === 'success') {
        Swal.fire({
          title: 'Success!',
          text: 'Profile updated successfully',
          icon: 'success',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update profile',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex md:pt-16 items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full">
          <div className="relative h-20">
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
              <img
                src={formData.profileImage || "/default.jpg"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <div className="absolute bottom-0 right-0">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="bg-blue-600 hover:bg-blue-600 text-white rounded-full p-2">
                    <Upload className="h-4 w-4" />
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-24 pb-8 px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {formData.username || "User"}
            </h1>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-600">Role</span>
                </div>
                <span className="text-gray-800">{formData.role}</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:bg-blue-400"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;