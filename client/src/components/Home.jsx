import './styles/Home.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, getActivities, filterByContinent, filterByActivity, filterSort, filterByPopulation } from '../redux/actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import Filter from './Filter';
import loading from './styles/img/plane.gif';

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
                <button onClick={e => {handleLoad(e)}} className="btn-1">Load all countries</button>
                <Link to="/activity"><button className="btn-2">Create activity</button></Link>
            </div>

            <div>
                <Filter
                    allActivities={allActivities}
                    handleFilterByContinent={handleFilterByContinent}
                    handleFilterByActivity={handleFilterByActivity}
                    handleSort={handleSort}
                    handleFilterByPopulation={handleFilterByPopulation}
                />
            </div>

            <div className="container-searchBar">
                <SearchBar />
            </div>


            <div>
                {allCountries.length > 0 ?
                    currentCountries[0].msg ?
                        <div className="not-found">
                            <p>{currentCountries[0].msg}</p>
                        </div>
                    :
                    <div>
                        <div className="container-paginado">
                            <Paginado
                                countriesPerPage={countriesPerPage}
                                allCountries={allCountries.length}
                                paginado={paginado}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                            />
                        </div>
                        <div className="container-card">
                            {currentCountries.map((e, i) => (
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
                            ))}
                        </div>
                    </div>
                :
                    <div className="loading">
                        <img alt="loading" src={loading} />
                    </div>
                }
            </div>
        </div>
    );
};
