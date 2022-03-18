import './styles/Paginado.css';
import React from 'react';

export default function Paginado({ countriesPerPage, allCountries, paginado }) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(((allCountries + 1) / countriesPerPage)); i++) {
        pageNumbers.push(i);
    };

    return (
        <nav>
            {
                pageNumbers?.map(number => {
                    return <button key={number} onClick={() => paginado(number)} className="button">{number}</button>
                })
            }
        </nav>
    );
};
