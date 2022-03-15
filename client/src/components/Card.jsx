import './styles/Card.css';
import React from 'react';

export default function Card({ name, image, continent, population }) {
    return (
        <div className="card">
            <img alt="img" src={image} />
            <h2>{name}</h2>
            <h4>Continent: {continent}</h4>
            <h5>Population: {population}</h5>
        </div>
    );
};
