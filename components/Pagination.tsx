import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({ setPage, dataCount, page }: any) {
  const totalPages = Math.ceil(dataCount / 8);
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(startPage + 4, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const pageNumber = startPage + index;

      return (
        <button
          key={pageNumber}
          onClick={() => {
            handlePageChange(pageNumber);
          }}
          className={
            pageNumber === page
              ? "bg-mixed-sky px-3 py-1 text-white rounded-md text-sm font-medium shadow-sm border border-gray-300"
              : "px-3 py-1 text-sm font-medium shadow-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 rounded-md"
          }
        >
          {pageNumber}
        </button>
      );
    });
  };


  return (
    <>
      <div className="hidden lg:flex justify-center flex-wrap gap-4 rounded-md">
        <button
          className={`py-1 px-4 rounded-lg bg-gray-300 ${
            page !== 1
              ? "hover:text-dark-white hover:bg-gray-500 border border-dark-gray"
              : "cursor-not-allowed"
          }`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        {getPageNumbers()}
        <button
          onClick={() => handlePageChange(page + 1)}
          className={`py-1 px-4 rounded-lg bg-gray-300 ${
            page !== totalPages
              ? "hover:text-dark-white hover:bg-gray-500 border border-dark-gray"
              : "cursor-not-allowed"
          }`}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      <div className="flex lg:hidden justify-center flex-wrap gap-1 rounded-md mx-4">
        <button
          className={`py-1 px-3 rounded-lg bg-gray-300 ${
            page !== 1
              ? "hover:text-dark-white hover:bg-gray-500 border border-dark-gray"
              : "cursor-not-allowed"
          }`}
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          <ArrowLeftIcon className="w-3" />
        </button>
        {getPageNumbers()}
        <button
          onClick={() => handlePageChange(page + 1)}
          className={`py-1 px-3 rounded-lg bg-gray-300 ${
            page !== totalPages
              ? "hover:text-dark-white hover:bg-gray-500 border border-dark-gray"
              : "cursor-not-allowed"
          }`}
          disabled={page === totalPages}
        >
          <ArrowRightIcon className="w-3" />
        </button>
      </div>
    </>
  );
}
