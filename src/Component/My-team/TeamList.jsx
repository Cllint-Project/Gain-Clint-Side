export const TeamList = ({ members }) => {
  if (!members?.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800">টিম তালিকা</h3>
        <p className="text-gray-500 mt-2">
          আপনি এখনও কোন টিম মেম্বার যোগ করেননি।
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">টিম তালিকা</h3>
      <div className="space-y-4">
        {members?.map((member) => (
          <div
            key={member._id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt={member.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-medium text-gray-900">{member.username}</h4>
                <p className="text-sm text-gray-500">{member.phoneNumber}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {member.balance} TK
              </p>
              <p className="text-xs text-gray-500">
                Joined {new Date(member.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
