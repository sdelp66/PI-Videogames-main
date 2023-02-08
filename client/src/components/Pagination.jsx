import React from "react";
import style from './Pagination.module.css';

const Pagination = ({ totalGames, gamesPerPage, currentPage, handlePageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.container}>
      {pageNumbers.map(number => (
        <button key={number} className={currentPage === number ? style.active : style.button} onClick={() => handlePageChange(number)}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
