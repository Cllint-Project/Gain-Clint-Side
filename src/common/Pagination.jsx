
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-2 mt-4 mb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
        Previous
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;