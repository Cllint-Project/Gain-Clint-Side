

const SecretCode = ( { value, onChange } ) => {
     return (
          <div>
          <div className="mb-2">
          <label htmlFor="numbar"
          className="text-lg"
          >
           Acount Numbar
          </label>
           <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Enter your Acount Numbar"
      className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-200"
      autoFocus
    />
          </div>
          <div  className="mb-2">
          <label htmlFor="numbar"
          className="text-lg"
          >
          Amount
          </label>
           <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Enter your Amount"
      className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-200"
      autoFocus
    />
          </div>
          <div  className="mb-2">
          <label htmlFor="numbar"
          className="text-lg"
          >
          Payment Method
          </label>
           <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Enter your Payment Method"
      className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-200"
      autoFocus
    />
          </div>
          </div>
     );
};

export default SecretCode;