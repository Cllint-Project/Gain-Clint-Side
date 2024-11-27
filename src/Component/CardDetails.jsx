import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CardDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [item, setItem] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://gain-server-side-production.up.railway.app/api/users/get-invest-data/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setItem(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);


  const handleRechargeClick = (machineData) => {
    navigate('/recharge', { state: { machineData } });
  };
  return (
    <div>
      <div className="max-w-md mx-auto border rounded-lg shadow-lg overflow-hidden mt-4 bg-white">
        <div className="relative">
          <img
            className="w-full h-48 object-cover" // Height কমিয়ে h-48 করা হয়েছে
            src={item?.machine_image} // Replace with actual image URL
            alt="P-45"
          />
          <div className="absolute top-4 left-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Logo"
              className="h-10"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent to-black text-white">
            <h1 className="text-3xl font-bold">{item?.machine_name}</h1>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">{item?.machine_name}</h2>
          <ul className="text-sm space-y-1">
            <li>
              মূল্য: <span className="font-semibold">{item?.investment_amount} TK</span>
            </li>
            <li>
              দৈনিক আয়: <span className="font-semibold">{item?.daily_income} TK</span>
            </li>
            <li>
              ভাড়ার সময়কাল: <span className="font-semibold">{item?.investment_duration} দিন</span>
            </li>
            <li>
              মোট আয়: <span className="font-semibold">{item?.total_income} TK</span>
            </li>
            <li>
              রিটার্ন রেট: <span className="font-semibold">{item?.invest_rate}</span>
            </li>
            <li>
              ক্রয় সীমা: <span className="font-semibold">{item?.invest_limit}</span>
            </li>
          </ul>
        </div>
        <div className="p-4 text-center">
          
            <button onClick={()=>handleRechargeClick(item)} className="w-full py-2 text-white bg-blue-400 hover:bg-blue-600 font-semibold btn btn-sm transition duration-300">
              এখনই কিনুন
            </button>
          
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
