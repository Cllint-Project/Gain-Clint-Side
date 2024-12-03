
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
          const response = await getTeamMembers(user?._id);
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