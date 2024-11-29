import { Briefcase, Mail, Phone } from "lucide-react";
import { useState } from "react";


const Profile = () => {
     const [phoneNumber, setPhoneNumber] = useState('');
     return (
          <div>
                 <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full">
        <div className="relative h-48">
          <img 
            src="https://images.unsplash.com/photo-1579503841516-e0bd7fca5faa?auto=format&fit=crop&q=80&w=800"
            alt="Profile cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>

        <div className="pt-24 pb-8 px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
          <p className="text-gray-500 font-medium mt-1">Senior Developer</p>

          <div className="mt-6 space-y-4">
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-600">Email</span>
              </div>
              <span className="text-gray-800">john.doe@example.com</span>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-600">Role</span>
              </div>
              <span className="text-gray-800">Full Stack Developer</span>
            </div>
          </div>

          <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
          </div>
     );
};

export default Profile;