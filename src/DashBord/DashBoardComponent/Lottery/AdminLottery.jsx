import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import SearchBar from "./SearchBar";
import WeekSelector from "./WeekSelector";
import LotteryTable from "./LotteryTable";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AdminLottery = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("current");
  const [lotteries, setLotteries] = useState([]);
  const [filteredLotteries, setFilteredLotteries] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchLotteries();
  }, [selectedWeek,axiosSecure]);

  useEffect(() => {
    const lowercasedFilter = searchText.toLowerCase();
    const filtered = lotteries.filter((item) =>
      item.lotteryNumber.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredLotteries(filtered);
  }, [searchText, lotteries]);

  const fetchLotteries = async () => {
    try {
      const response = await axiosSecure.get(`/api/lottery/${selectedWeek}-week`);
      setLotteries(response.data.data);
      setFilteredLotteries(response.data.data);
    } catch (error) {
      console.error('Error fetching lotteries:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch lottery entries',
        icon: 'error'
      });
    }
  };

  const handleSpinLottery = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You're about to select this week's lottery winner!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, select winner!'
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.post('/api/lottery/select-winner');
        console.log(response?.data?.data)
        if (response?.data?.success) {
          Swal.fire({
            title: 'Winner Selected!',
            text: `Winning number: ${response?.data?.data?.lotteryNumber}`,
            icon: 'success'
          });
          fetchLotteries();
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Failed to select winner',
          icon: 'error'
        });
      }
    }
  };

  const handleDelete = async (id,lotteryNumber) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/api/lottery/delete`, {
          data: { id, lotteryNumber }
        });
        // setLotteries(lotteries.filter(lottery => lottery._id !== id));
        Swal.fire(
          'Deleted!',
          'Lottery entry has been deleted.',
          'success'
        );
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete lottery entry',
        icon: 'error'
      });
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
              onWeekChange={setSelectedWeek} 
            />
          </div>
          
          {selectedWeek === 'current' && (
            <button
              onClick={handleSpinLottery}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Spin Lottery
            </button>
          )}
        </div>

        <LotteryTable
          lotteries={filteredLotteries}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AdminLottery;