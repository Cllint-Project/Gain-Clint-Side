import { useContext, useEffect, useState } from "react";
import { TeamList } from "./TeamList";
import { TeamInvite } from "./TeamInvite";
import { TeamStats } from "./TeamStats";
import { TeamHeader } from "./TeamHeader";
import { getTeamMembers } from "../../utils/api";
import LoadingSpinner from "../../common/LoadingSpinner";
import { AuthContext } from "../../Auth/AuthProvider";
import DailyBalanceStats from "../../Page/Balance/DailyBalanceStats";

const Team = () => {
  const { user, loading, setLoading, fetchBalanceHistory, balanceHistory } =
    useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);

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
  }, [user?._id, setLoading]);
  
  useEffect(() => {
    fetchBalanceHistory();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <TeamHeader user={userData} />
        <TeamStats userData={userData} />
        <DailyBalanceStats balanceHistory={balanceHistory} />
        <TeamInvite referralCode={userData.referralCode} />
        <TeamList members={teamMembers} />
      </div>
    </div>
  );
};

export default Team;
