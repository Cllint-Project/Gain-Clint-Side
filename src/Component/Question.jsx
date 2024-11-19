

const Question = () => {
     return (
          <div>
     <div className="flex flex-col gap-4 p-6 max-w-full my-11 mx-auto w-full ">
      {/* Image and Title */}
      <div className=" p-10 flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/100"
          alt="Placeholder"
          className="w-16 h-16 object-cover rounded"
        />
        <h2 className="text-2xl  font-semibold">
          TERAWULF এর সর্বশেষ উন্নয়ন ফলাফল: PRO মাইনিং মেশিন
        </h2>
      </div>

      {/* Links or Buttons */}
      <div className="flex flex-col gap-2 space-y-7">
        <button className="text-left text-xl w-full h-full  px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50">
          আমাদের সম্পর্কে
        </button>
        <button className="text-left  text-xl w-full px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50">
          নটিলাস ক্রিপ্টোমিন
        </button>
        <button className="text-left  text-xl w-full px-4 py-2 bg-white border rounded shadow-sm hover:bg-gray-50">
          TeraWulf mengumumkan pembaruan produksi dan operasi Mei 2024
        </button>
      </div>
    </div>
          </div>
     );
};

export default Question;