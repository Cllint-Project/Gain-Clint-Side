import { Link } from "react-router-dom";


const Question = () => {
     return (
          <div>
     <div className="flex flex-col gap-4 p-6 max-w-full  my-11 mx-auto w-full  ">
      {/* Image and Title */}
      <Link to={'/details'}  className=" p-2 flex items-center space-x-3">
        <img
          src="https://i.ibb.co.com/9ym55kQ/c0dfe686453a5203.png"
          alt="Placeholder"
          className="w-16 h-16 s object-cover rounded"
        />
        <h2 className="text-2xl  font-semibold">
          Gain এর সর্বশেষ উন্নয়ন ফলাফল: PRO মাইনিং মেশিন
        </h2>
      </Link>

      {/* Links or Buttons */}
      <div className="flex flex-col gap-2 space-y-2 p-4">
        <Link to={'/detail'} className="text-left text-lg w-full h-[80px]  px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50">
          আমাদের সম্পর্কে
        </Link>
        <Link to={'/detailed'} className="text-left  text-lg w-full  h-[80px] px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50">
          নটিলাস ক্রিপ্টোমিন
        </Link>
        <Link to={"/data"} className="text-left  text-lg w-full  h-[80px] px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50">
          Gain mengumumkan pembaruan produksi dan operasi Mei 2024
        </Link>
      </div>
    </div>
          </div>
     );
};

export default Question;