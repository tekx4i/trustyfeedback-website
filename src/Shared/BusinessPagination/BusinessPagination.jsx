import React from "react";
import "./BusinessPagination.scss";

const BusinessPagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPages = () => {
    const pages = [];

    // Show first 5 pages
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      pages.push(
        <button key={i} onClick={() => onPageChange(i)} className={`page-button ${currentPage === i ? "active" : ""}`}>
          {i}
        </button>,
      );
    }

    // Show ellipsis if there are more pages
    if (totalPages > 6) {
      pages.push(
        <span key="ellipsis" className="ellipsis">
          ...
        </span>,
      );
    }

    // Show the last page
    if (totalPages > 5) {
      pages.push(
        <button key={totalPages} onClick={() => onPageChange(totalPages)} className={`page-button ${currentPage === totalPages ? "active" : ""}`}>
          {totalPages}
        </button>,
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      {/* Previous button */}
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="page-button next-prev">
        Prev
      </button>

      {/* Page numbers */}
      {renderPages()}

      {/* Next button */}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="page-button next-prev">
        Next
     </button>
    </div>
  );
};

export default BusinessPagination;
