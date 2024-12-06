import { useState } from "react";
import Swal from "sweetalert2";
import SearchBar from "./SearchBar";
import WeekSelector from "./WeekSelector";
import LotteryTable from "./LotteryTable";
import Pagination from "../../../common/Pagination";
import usePagination from "../../../Hooks/UsePagination";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AdminLottery = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("current");
  const [errorMessage, setErrorMessage] = useState("");
  const axiosSecure = useAxiosSecure();

  const fetchLotteryData = async (page, itemsPerPage) => {
    try {
      const response = await axiosSecure.get(`/api/lottery/${selectedWeek}-week`, {
        params: { page, limit: itemsPerPage },
      });
      if (response?.data?.success === false) {
        setErrorMessage(response?.data?.message || "No data available.");
        return [];
      }
      setErrorMessage("");
      return response;
    } catch (error) {
      console.error("Error fetching lottery data:", error);
      setErrorMessage("Failed to load lottery data.");
      return [];
    }
  };

  const {
    data: lotteries = [],
    currentPage,
    totalPages,
    loading,
    handlePageChange,
    refresh,
  } = usePagination(fetchLotteryData, 10);

  const filteredLotteries = lotteries.filter((item) =>
    item?.lotteryNumber?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSpinLottery = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You're about to select this week's lottery winner!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, select winner!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.post("/api/lottery/select-winner");
        if (response?.data?.success) {
          Swal.fire({
            title: "Winner Selected!",
            text: `Winning number: ${response?.data?.data?.lotteryNumber}`,
            icon: "success",
          });
          refresh();
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Failed to select winner",
          icon: "error",
        });
      }
    }
  };

  const handleDelete = async (id, lotteryNumber) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete("/api/lottery/delete", {
          data: { id, lotteryNumber },
        });
        Swal.fire("Deleted!", "Lottery entry has been deleted.", "success");
        refresh();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Failed to delete lottery entry",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SearchBar
              searchText={searchText}
              onSearchChange={setSearchText}
            />
            <WeekSelector
              selectedWeek={selectedWeek}
              onWeekChange={(week) => {
                setSelectedWeek(week);
                refresh();
              }}
            />
          </div>

          {selectedWeek === "current" && (
            <button
              onClick={handleSpinLottery}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Spin Lottery
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : errorMessage ? (
          <div className="text-center text-gray-500 py-10">
            {errorMessage}
          </div>
        ) : (
          <>
            {filteredLotteries.length > 0 ? (
              <>
                <LotteryTable
                  lotteries={filteredLotteries}
                  onDelete={handleDelete}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center text-gray-500 py-10">
                No matching results found.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLottery;
