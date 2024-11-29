import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";


const EntryProject = () => {
     return (
<div className="bg-gray-50 p-6 rounded-lg max-w-3xl mx-auto my-10">
  {/* Header Section */}
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-3">
      প্রায়শই জিজ্ঞাসিত প্রশ্ন
    </h2>
    <hr className="border-t-2 border-gray-200" />
  </div>

  {/* FAQ Items */}
  <div className="space-y-4">
     
    {/* First FAQ */}
     <Link to={"/faq"}>
     <div className="flex items-center justify-between bg-white p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
      <h2 className="text-lg text-gray-700 font-medium">
        কীভাবে নতুন সদস্যদের আমন্ত্রণ জানাবেন
      </h2>
      <span className="text-gray-600 text-xl">
        <IoIosArrowForward />
      </span>
    </div>
     </Link >
    {/* Second FAQ */}
    <Link to={'/faqs'}>
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <h2 className="text-lg text-gray-700 font-medium">
        ভিআইপি কমিশন অনুপাত
      </h2>
      <span className="text-gray-600 text-xl">
        <IoIosArrowForward />
      </span>
    </div>
    </Link>
  </div>
</div>

     );
};

export default EntryProject;