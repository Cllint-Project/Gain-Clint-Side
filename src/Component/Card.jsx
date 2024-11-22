

const Card = () => {
     const items = [
          { title: "রিচার্জ", icon: "📄" },
          { title: "উত্তোলন", icon: "⚙️" },
          { title: "বিনিয়োগ রেকর্ড", icon: "📈" },
          { title: "প্রারম্ভিক জমা প্রকল্প", icon: "🏢" },
        ];
     return (
          <div>
          <div className="flex justify-around bg-slate-200 p-3 items-center space-x-2 ">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-blue-500 border-b-8 border-b-yellow-400 text-white rounded-md shadow-md w-24 h-28 justify-center"
        >
          <div className="text-3xl">{item.icon}</div>
          <span className="mt-2 text-center text-sm">{item.title}</span>
        </div>
      ))}
    </div>
          </div>
     );
};

export default Card;