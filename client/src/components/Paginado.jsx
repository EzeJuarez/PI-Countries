import './styles/Paginado.css';
import React from 'react';

export default function Paginado({ countriesPerPage, allCountries, paginado, setCurrentPage, currentPage }) {
    const pageNumbers = [];
    const pages = Math.ceil((allCountries + 1) / countriesPerPage);

    for(let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    };

    return (
        <nav>
            <button className="button-prev-next" onClick={() => setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1)}>
                {"< prev"}
            </button>
            { pageNumbers?.map(number => <button className="button" key={number} onClick={() => paginado(number)}>{number}</button>) }
            <button className="button-prev-next" onClick={() => setCurrentPage(currentPage === pages ? currentPage : currentPage + 1)}>
                {"next >"}
            </button>
        </nav>
    );
};
