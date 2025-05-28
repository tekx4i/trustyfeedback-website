import React, { useState, useCallback } from "react";
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import "./Pagination.scss";

const Pagination = ({ title, total, page, setPage, perPage, last_page, bgColor }) => {
  const [active, setActive] = useState(page);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage >= 1 && newPage <= total) {
        window.scrollTo(0, 0);
        setPage(newPage);
        navigate(`${location.pathname}?page=${newPage}`);
        setActive(newPage);
      }
    },
    [setPage, navigate, location.pathname, total],
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (total <= 6) {
      // If total pages are 6 or less, show all pages
      for (let i = 1; i <= total; i++) {
        pageNumbers.push(
          <button className={`page-button ${page === i ? "active" : ""}`} onClick={() => handlePageChange(i)}>
            {i}
          </button>,
        );
      }
    } else {
      // If total pages are more than 6
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(
          <button className={`page-button ${page === i ? "active" : ""}`} onClick={() => handlePageChange(i)}>
            {i}
          </button>,
        );
      }
      if (page > 3) {
        pageNumbers.push(
          <li key="dots1" className="page-item">
            <p className="mb-0 align-self-center mx-3"> ... </p>
          </li>,
        );
      }
      for (let i = Math.max(4, page - 1); i <= Math.min(total - 1, page + 1); i++) {
        pageNumbers.push(
          <li key={i} className="page-item">
            <button className={`page-button ${page === i ? "active" : ""}`} onClick={() => handlePageChange(i)}>
              {i}
            </button>
          </li>,
        );
      }
      if (page < total - 2) {
        pageNumbers.push(
          <li key="dots2" className="page-item">
            <p className="mb-0 align-self-center mx-3"> ... </p>
          </li>,
        );
      }
      pageNumbers.push(
        <li key={total} className="page-item">
          <button className={`page-button ${page === total ? "active" : ""}`} onClick={() => handlePageChange(total)}>
            {total}
          </button>
        </li>,
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination">
      <nav aria-label="...">
        <ul className="pagination pagination-sm">
          <li className="page-item">
            <a className={`page-button next-prev ${page === 1 ? "disabled" : ""}`} onClick={() => handlePageChange(page - 1)}>
              <HiOutlineChevronDoubleLeft />
            </a>
          </li>
          {renderPageNumbers()}
          <li className="page-item">
            <a className={`page-button next-prev ${page === total ? "disabled" : ""}`} onClick={() => handlePageChange(page + 1)}>
              <HiOutlineChevronDoubleRight />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
