/* eslint-disable react/prop-types */
export const TeamHeader = ({ user }) => {

    return (
      <div className="bg-blue-500 rounded-t-lg">
        <div className="p-6 flex items-center gap-4">
          <div className="w-16 h-16">
            <img
              src={user?.profileImage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              {user?.username || 'User'}
            </h2>
            <p className="text-blue-100">{user?.phoneNumber}</p>
          </div>
        </div>
      </div>
    );
  };