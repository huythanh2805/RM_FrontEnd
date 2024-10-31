import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={
        <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border-t border-l border-b border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
          Previous
        </span>
      }
      nextLabel={
        <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border-t border-r border-b border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
          Next
        </span>
      }
      breakLabel={<span className="px-2 text-gray-500">...</span>}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName="flex justify-center items-center py-4 bg-white"
      pageLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300"
      activeClassName="bg-blue-500 text-white border border-blue-500"
      breakClassName="text-gray-500"
    />
  );
};

export default Pagination;
