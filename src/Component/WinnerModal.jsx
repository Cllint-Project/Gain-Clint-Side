import { useEffect, useState } from "react";
import { XCircle, Trophy } from "lucide-react";
import useAxiosSecure from "../Hooks/UseAxiosSecure";

const WinnerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [winnerData, setWinnerData] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedWinnerModal');
    // console.log(hasVisited)

    if (!hasVisited) {
      fetchWinnerData();
      sessionStorage.setItem('hasVisitedWinnerModal', 'true');
    }
    // fetchWinnerData();
  }, []);

  const fetchWinnerData = async () => {
    try {
      const response = await axiosSecure.get("/api/lottery/weekly-winner");
      console.log("winner", response.data);
      setWinnerData(response.data.data);
      setIsOpen(true);
    } catch (error) {
      console.error("Failed to fetch winner data:", error);
    }
  };

  if (!isOpen || !winnerData) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-2xl max-w-md w-full p-8 relative transform animate-slideUp">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XCircle className="w-6 h-6" />
        </button>

        {/* Trophy Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 p-4 rounded-full">
            <Trophy className="w-12 h-12 text-yellow-500 animate-bounce" />
          </div>
        </div>

        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          🎉 Congratulations! 🎉
        </h2>

        {/* Winner Info Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-purple-100">
          <div className="space-y-4">
            {/* Winner Name */}
            <div className="flex justify-between">
              <div className="text-center">
                <label className="text-sm font-medium text-gray-500">
                  Winner
                </label>
                <p className="text-xl font-bold text-gray-800">
                  {winnerData.username}
                </p>
              </div>

              {/* Winning Number */}
              <div className="text-center">
                <label className="text-sm font-medium text-gray-500">
                  Lucky Number
                </label>
                <p className="text-lg font-semibold text-purple-600">
                  #{winnerData.lotteryNumber}
                </p>
              </div>
            </div>

            {/* Prize Amount */}
            <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
              <label className="text-sm font-medium text-gray-500">
                Prize Amount
              </label>
              <p className="text-2xl font-bold text-green-600">
                ${Number(winnerData.prizeAmount).toLocaleString()}
              </p>
            </div>

            {/* Winning Date */}
            <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <label className="text-sm font-medium text-gray-500">
                Winning Date
              </label>
              <p className="text-lg font-semibold text-blue-600">
                {new Date(winnerData.spinDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Congratulatory Message */}
        <p className="text-center mt-6 text-gray-600 italic">
          Join our next lottery for your chance to win!
        </p>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-purple-400 rounded-full animate-ping opacity-75"></div>
      </div>
    </div>
  );
};

export default WinnerModal;
