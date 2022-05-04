import './styles/Home.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, getActivities, filterByContinent, filterByActivity, filterSort, filterByPopulation } from '../redux/actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home() {
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.countries);
    const allActivities = useSelector(state => state.activities);
    const [ , setOrder ] = useState("");
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ countriesPerPage ] = useState(10);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const paginado = pageNumber => {
        setCurrentPage(pageNumber);
    };
    let currentCountries = [];

    if(currentPage === 1) {
        currentCountries = allCountries.slice(0, 9);
    }else {
        currentCountries = allCountries.slice((indexOfFirstCountry - 1), (indexOfLastCountry - 1));
    };

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getActivities());
    }, [dispatch]);

    function handleLoad(e) {
        e.preventDefault();
        dispatch(getAllCountries());
    };

    function handleFilterByContinent(e) {
        e.preventDefault();
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
    };

    function handleFilterByActivity(e) {
        e.preventDefault();
        dispatch(filterByActivity(e.target.value));
        setCurrentPage(1);
    };

    function handleSort(e) {
        e.preventDefault();
        dispatch(filterSort(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    };

    function handleFilterByPopulation(e) {
        e.preventDefault();
        dispatch(filterByPopulation(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    };

    return (
        <div>

            <div className="container-buttons">
                <button onClick={e => {handleLoad(e)}} className="btn-1">Load all countries again</button>
                <Link to="/activity"><button className="btn-2">Create activity</button></Link>
            </div>

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

                { allActivities.length > 0 ?
                    <div className="filter">
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
                    </div>
                    :
                    <div className="filter">
                        <div>
                            <span>Filter by activity</span>
                            <select defaultValue="Activities" onChange={e => {handleFilterByActivity(e)}}>
                                <option disabled>Activities</option>
                                <option disabled>Not found</option>
                            </select>
                        </div>
                    </div>
                }
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

            <div className="container-searchBar">
                <SearchBar />
            </div>

            <div className="container-paginado">
                <Paginado countriesPerPage={countriesPerPage} allCountries={allCountries.length} paginado={paginado} />
            </div>

            <div className="container-card">
                {allCountries.length > 0 ?
                    currentCountries[0].msg ?
                        <div className="not-found">
                            <p>{currentCountries[0].msg}</p>
                        </div>
                    :
                    currentCountries.map((e, i) => (
                        <Link key={i} to={"/home/" + e.cca3}>
                            <Card
                                key={e.cca3}
                                cca3={e.cca3}
                                name={e.name}
                                image={e.flags[0]}
                                continent={e.continent}
                                population={e.population}
                            />
                        </Link>
                    ))
                :
                    <div className="loading">
                        <p>Loading</p>
                    </div>
                }
            </div>
        </div>
    );
};
