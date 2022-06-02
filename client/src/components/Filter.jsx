import './styles/Filter.css'
import React from 'react';

export default function Filter({ allActivities, handleFilterByContinent, handleFilterByActivity, handleSort, handleFilterByPopulation }) {
    return (
        <div className="container-filter">
            <div className="filter">
                <div>
                    <span>Filter by continent</span>
                    <select onChange={e => {handleFilterByContinent(e)}}>
                        <option value="All">All</option>
                        <option value="Africa">Africa</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
            </div>

            <div className="filter">
                { allActivities.length > 0 ?
                    <div>
                        <span>Filter by activity</span>
                        <select defaultValue="Activities" onChange={e => {handleFilterByActivity(e)}}>
                            <option disabled>Activities</option>
                            <option value="All">All</option>
                                {
                                    allActivities.map((e, i) => (
                                        <option key={i} value={e.name}>{e.name}</option>
                                    ))
                                }
                        </select>
                    </div>
                :
                    <div>
                        <span>Filter by activity</span>
                        <select defaultValue="Activities" onChange={e => {handleFilterByActivity(e)}}>
                            <option disabled>Activities</option>
                            <option disabled>Not found</option>
                        </select>
                    </div>
                }
            </div>

            <div className="filter">
                <div>
                    <span>Filter by alphabet</span>
                    <select defaultValue="Order" onChange={e => {handleSort(e)}}>
                        <option disabled>Order</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>
            </div>

            <div className="filter">
                <div>
                    <span>Filter by population</span>
                    <select defaultValue="Order" onChange={e => {handleFilterByPopulation(e)}}>
                        <option disabled>Order</option>
                        <option value="asc">Ascendent</option>
                        <option value="des">Descendent</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
