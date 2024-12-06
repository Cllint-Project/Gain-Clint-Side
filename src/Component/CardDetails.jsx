import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { BuyMachine } from "../utils/api";
import { toast } from "react-toastify";
import useAxiosSecure from "../Hooks/UseAxiosSecure";

const CardDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { adminData, fetchAdminData, user } = useContext(AuthContext);
  const [LastRechargeData, setLastRechargeData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get(
          `/api/users/get-invest-data/${id}`
        );
        setItem(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, axiosSecure]);
  useEffect(() => {
    fetchAdminData();
  }, []);

  useEffect(() => {
    // get recharge record
    const fetchLastRechargeData = async () => {
      try {
        if (user?._id) {
          const res = await axiosSecure.get(
            `/api/users/get-recharge-LastData/${user?._id}`
          );

          console.log("hdsfhsd", res.data.data);

          if (res.data.success) {
            setLastRechargeData(res?.data?.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch recharge data:", error);
      }
    };

    fetchLastRechargeData();
  }, [axiosSecure, user?._id]);

  console.log("LastRechargeData:", LastRechargeData);

  const handleRechargeClick = async (machineData) => {
    const newMachineData = {
      admin_number: adminData?.phoneNumber,
      investor_id: user?._id,
      investor_name: user?.username,
      recharge_amount: machineData?.investment_amount || 0,
      recharge_option: LastRechargeData?.recharge_option,
      phone_number: LastRechargeData?.phone_number,
      machine_details: {
        machine_name: item?.machine_name,
        investment_amount: item?.investment_amount,
        investment_duration: Number(item?.investment_duration),
        daily_income: item?.daily_income,
        total_income: item?.total_income,
        invest_rate: item?.invest_rate,
        invest_limit: item?.invest_limit,
        vipStatus: item?.vipStatus,
        machine_image: item?.machine_image,
      },
    };

    console.log("newMachineData:", newMachineData);
    if ((LastRechargeData?.phone_number === "") | undefined) {
      return toast.error("মেশিন কেনার আগে রিচার্জ করুন");
    }

    try {
      const response = await BuyMachine(newMachineData);
      
      if (response.success) {
        setTimeout(() => {
          navigate("/investmentrecord");
        }, 1000);
      }
    } catch (error) {
      console.error("Error processing transaction:", error);
    }
  };

  return (
    <div>
      <div className="max-w-lg mb-14 mt-10 mx-auto border rounded-lg shadow-lg overflow-hidden  bg-white">
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={item?.machine_image} // Replace with actual image URL
            alt="P-45"
          />
          <div className="absolute top-4 left-4">
            <img
              src="/gain-logo.jpeg"
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
              মূল্য:{" "}
              <span className="font-semibold">
                {item?.investment_amount} TK
              </span>
            </li>
            <li>
              দৈনিক আয়:{" "}
              <span className="font-semibold">{item?.daily_income} TK</span>
            </li>
            <li>
              ভাড়ার সময়কাল:{" "}
              <span className="font-semibold">
                {item?.investment_duration} দিন
              </span>
            </li>
            <li>
              মোট আয়:{" "}
              <span className="font-semibold">{item?.total_income} TK</span>
            </li>
            <li>
              রিটার্ন রেট:{" "}
              <span className="font-semibold">{item?.invest_rate}</span>
            </li>
            <li>
              ক্রয় সীমা:{" "}
              <span className="font-semibold">{item?.invest_limit}</span>
            </li>
          </ul>
        </div>
        <div className="p-4 text-center">
          <button
            onClick={() => handleRechargeClick(item)}
            className="w-full py-2 text-white bg-blue-400 hover:bg-blue-600 font-semibold btn btn-sm transition duration-300"
          >
            এখনই কিনুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
