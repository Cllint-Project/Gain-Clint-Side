

const SecretCode = ( { value, onChange } ) => {
     return (
          <div>
           <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Enter your secret code"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-200"
      autoFocus
    />
          </div>
     );
};

export default SecretCode;