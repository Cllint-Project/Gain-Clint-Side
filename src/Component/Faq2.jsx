

const Faq2 = () => {
     return (
<div className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-3xl mx-auto my-10">
  {/* Title Section */}
  <div className="mb-5">
    <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
      ভিআইপি কমিশন অনুপাত
    </h2>
    <hr className="border-t-2 border-gray-300" />
  </div>

  {/* Images Section */}
  <div className="space-y-5">
    {/* First Image */}
    <div>
      <img
        className="w-full h-auto rounded-lg shadow-md"
        src="https://api.terawulf-pre.com/upload/fc54b2338ea5af0f/cda579dac0d20067.jpg"
        alt="Commission Chart 1"
      />
    </div>

    {/* Second Image */}
    <div>
      <img
        className="w-full h-auto rounded-lg shadow-md"
        src="https://api.terawulf-pre.com/upload/14fd060be254d04e/76657f3d8cbdc228.jpg"
        alt="Commission Chart 2"
      />
    </div>
  </div>
</div>

     );
};

export default Faq2;