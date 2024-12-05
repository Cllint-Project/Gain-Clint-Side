import { useContext, useEffect, useState } from "react";
import BalanceOverview from "./BalanceOverview";
import { AuthContext } from "../../Auth/AuthProvider";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import LoadingSpinner from "../../common/LoadingSpinner";

// In your page component:
const ShowBalanceDetails = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [balanceHistory, setBalanceHistory] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchBalanceData = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }
      try {
        const response = await axiosSecure.get(
          `/api/users/getUserBalanceDetails/${user._id}`
        );
        const userData = response?.data?.data?.balanceHistory;
        console.log(userData, 3845);
        setBalanceHistory(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalanceData();
  }, [user?._id,  axiosSecure, setLoading]); // Add user?.balanceHistory in the dependency list

  if (loading) return <LoadingSpinner />;


  return (
    <div className="container mx-auto px-4 py-8">
      <BalanceOverview balanceHistory={balanceHistory} />
    </div>
  );
};

export default ShowBalanceDetails;
