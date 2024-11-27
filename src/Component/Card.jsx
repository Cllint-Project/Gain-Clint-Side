import { FaBuilding, FaChartLine, FaCog } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { Link } from "react-router-dom";


const Card = () => {
    
     return (
          <div>
          <div className="flex justify-evenly bg-slate-200 p-3 items-center  ">
      
        <Link to={'/recharge'}
          
          className="flex flex-col items-center bg-blue-500 border-b-8 border-b-yellow-400 text-white rounded-md shadow-md w-24 h-28 justify-center"
        >
          <div className="text-3xl"><FaWallet></FaWallet></div>
          <span className="mt-2 text-center text-sm">রিচার্জ</span>
        </Link>
        <Link to={'/withdraw'}
          
          className="flex flex-col items-center bg-blue-500 border-b-8 border-b-yellow-400 text-white rounded-md shadow-md w-24 h-28 justify-center"
        >
          <div className="text-3xl"><FaCog /></div>
          <span className="mt-2 text-center text-sm">উত্তোলন</span>
        </Link>
        <div
          
          className="flex flex-col items-center bg-blue-500 border-b-8 border-b-yellow-400 text-white rounded-md shadow-md w-24 h-28 justify-center"
        >
          <div className="text-3xl">< FaChartLine /></div>
          <span className="mt-2 text-center text-sm">বিনিয়োগ রেকর্ড</span>
        </div>
        <div
          
          className="flex flex-col items-center bg-blue-500 border-b-8 border-b-yellow-400 text-white rounded-md shadow-md w-24 h-28 justify-center"
        >
          <div className="text-3xl">< FaBuilding /></div>
          <span className="mt-2 text-center text-sm">প্রারম্ভিক জমা প্রকল্প</span>
        </div>
    
    </div>
          </div>
     );
};

export default Card;