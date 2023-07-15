// import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// export default function Pagination({ setPage, data, page }: any) {
//   const handlePageChange = (pageNumber) => {
//     setPage(pageNumber);
//   };

//   const getPageNumbers = () => {
//     const totalPages = Math.ceil(data?.count / 40);
//     const startPage = Math.max(1, page - 2);
//     const endPage = Math.min(startPage + 4, totalPages);

//     return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
//       const pageNumber = startPage + index;

//       return (
//         <button
//           key={pageNumber}
//           onClick={() => {
//             handlePageChange(pageNumber);
//           }}
//           className={
//             pageNumber === page
//               ? "bg-sky-500 px-3 py-1 text-white rounded-md text-sm font-medium shadow-sm border border-gray-300 hover:bg-sky-600"
//               : "px-3 py-1 text-sm font-medium shadow-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 rounded-md"
//           }
//         >
//           {pageNumber}
//         </button>
//       );
//     });
//   };

//   return (
//     <>
//       <div className="hidden lg:flex justify-center flex-wrap gap-2 rounded-md">
//         <button
//           extraClassName={
//             !data?.previous ? "opacity-50 cursor-not-allowed" : ""
//           }
//           onClick={() => handlePageChange(page - 1)}
//           disabled={!data?.previous}
//         >
//           {t("BUTTON.PREVIOUS")}
//         </button>
//         {getPageNumbers()}
//         <button
//           onClick={() => handlePageChange(page + 1)}
//           disabled={!data?.next}
//           extraClassName={!data?.next ? "opacity-50 cursor-not-allowed" : ""}
//         >
//           {t("BUTTON.NEXT")}
//         </button>
//       </div>
//       <div className="flex lg:hidden justify-center flex-wrap gap-1 rounded-md">
//         <button
//           extraClassName={
//             !data?.previous ? "opacity-50 cursor-not-allowed" : ""
//           }
//           onClick={() => handlePageChange(page - 1)}
//           disabled={!data?.previous}
//         >
//           <ArrowLeftIcon className="w-3" />
//         </button>
//         {getPageNumbers()}
//         <button
//           onClick={() => handlePageChange(page + 1)}
//           disabled={!data?.next}
//           extraClassName={!data?.next ? "opacity-50 cursor-not-allowed" : ""}
//         >
//           <ArrowRightIcon className="w-3" />
//         </button>
//       </div>
//     </>
//   );
// }
