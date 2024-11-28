// import axios from "axios";
// import { useEffect, useState } from "react";

// const Team = () => {

//   const [userData, setUserData] = useState({});
//   const [loading, setLoading] = useState(true);

//   // Parse the user data from localStorage
//   const user = JSON.parse(localStorage.getItem("user"));
// console.log(user)
//   useEffect(() => {
//     if (user?.phoneNumber) {
//       // সার্ভার থেকে ফোন নাম্বার দিয়ে ডেটা আনার জন্য axios GET রিকোয়েস্ট পাঠানো হচ্ছে
//       axios
//         .get(`http://localhost:5000/api/users/getUser/${user?.phoneNumber}`)
//         .then((response) => {
//           setUserData(response.data); // সার্ভার থেকে আসা ডেটা সেট করা হচ্ছে
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching user data:", error);
//           setLoading(false);
//         });
//     } else {
//       console.error("No phone number found in local storage");
//       setLoading(false);
//     }
//   }, [user?.phoneNumber]);

//   if (loading) {
//     return <div>Loading...</div>; // ডেটা লোডিং চলাকালীন লোডিং বার্তা দেখানো হচ্ছে
//   }

//   console.log(userData);

//   return (
//     <div>
//       <div className=" mx-5 mr-5 mt-2 min-h-screen ">
//         <div className="bg-blue-500">
//           {/* Profile Section */}
//           <div>
//             <div className="max-w-6xl  p-6 flex items-center gap-4">
//               {/* Profile Image */}
//               <div className="w-16 h-16">
//                 <img
//                   src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                   alt="Profile"
//                   className="w-full h-full rounded-full object-cover"
//                 />
//               </div>
//               {/* Profile Info */}
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-200">
//                   {userData?.username}
//                 </h2>
//                 <p className="text-gray-200">{userData?.phoneNumber}</p>
//               </div>
//             </div>
//           </div>
//           {/* Top Section */}
//           <div className=" p-6 mt-4">
//             <div className="max-w-6xl  flex flex-wrap gap-4 mx-3 text-center">
//               {/* Card 1 */}
//               <div className=" text-white p-4 rounded-lg">
//                 <h2 className="text-xl font-semibold">{userData?.balance}TK</h2>
//                 <p>মোট আয়</p>
//               </div>
//               {/* Card 2 */}
//               <div className=" text-white p-4 rounded-lg">
//                 <h2 className="text-xl font-semibold">0.00TK</h2>
//                 <p>আজ</p>
//               </div>
//               {/* Card 3 */}
//               <div className=" text-white p-4 rounded-lg">
//                 <h2 className="text-xl font-semibold">0.00TK</h2>
//                 <p>গতকাল</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Middle Section */}
//         <div className="max-w-6xl  mt-6">
//           <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
//             {/* Left Section */}
//             <div className="flex gap-6">
//               <div>
//                 <h3 className="text-2xl font-semibold text-gray-800">{userData?.balance}</h3>
//                 <p className="text-gray-500">Total Income</p>
//               </div>
//               <div>
//                 <h3 className="text-2xl font-semibold text-gray-800">{userData?.referralEarnings}</h3>
//                 <p className="text-gray-500">আজ বোনাস</p>
//               </div>
//             </div>
//             {/* Right Section */}
//             <div className="flex flex-col flex-wrap items-center">
//               <img
//                 src="https://via.placeholder.com/50"
//                 alt="Share Icon"
//                 className="h-12 w-12"
//               />
//               <p className="text-gray-500 text-center mt-2">
//                 মেয়ুন বন্ধুদের আমন্ত্রণ
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="max-w-6xl  mt-6 my-44">
//           <div className="bg-white shadow-lg rounded-md p-6">
//             <h3 className="text-lg font-semibold text-gray-800">টিম তালিকা</h3>
//             <p className="text-gray-500 mt-2">
//               এখানে আপনার টিমের তথ্য দেখানো হবে।
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Team;


import { useEffect, useState } from "react";
import { TeamList } from "./TeamList";
import { TeamInvite } from "./TeamInvite";
import { TeamStats } from "./TeamStats";
import { TeamHeader } from "./TeamHeader";
import { getTeamMembers } from "../../utils/api";
import LoadingSpinner from "../../common/LoadingSpinner";

const Team = () => {
  const [userData, setUserData] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      if (user?._id) {
        try {
          const response = await getTeamMembers(user._id);
          setUserData(response.userData);
          setTeamMembers(response.teamMembers);
        } catch (error) {
          console.error("Error fetching team data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?._id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <TeamHeader user={userData} />
        <TeamStats userData={userData} />
        <TeamInvite referralCode={userData.referralCode} />
        <TeamList members={teamMembers} />
      </div>
    </div>
  );
};

export default Team;