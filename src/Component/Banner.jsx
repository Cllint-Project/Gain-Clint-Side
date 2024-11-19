

const Banner = () => {
     return (
          <div>
<div className="w-full">
  {/* Header Section */}
  <div className="flex justify-between items-center bg-blue-500 px-4 py-2">
    {/* Logo */}
    <div>
      {/* Replace the commented code with your logo if needed */}
      <h2 className="text-2xl text-white">Gain</h2>
    </div>
    {/* Icon or Flag */}
    <div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg"
        alt="Flag"
        className="h-8 w-8 rounded-full"
      />
    </div>
  </div>

  {/* Main Image Section */}
  <div className="relative">
    <img
      src="https://img.freepik.com/free-vector/gradient-real-estate-linkedin-banner_23-2149058715.jpg?t=st=1731998828~exp=1732002428~hmac=d7d2ff3ebb88f3b50e10a11c902a63a416f60269ccab7353cd1f21b6fa7113e8&w=1060"
      alt="Banner Image"
      className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
    />
  </div>
</div>

          </div>
     );
};

export default Banner;