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
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getActivities());
    }, [dispatch]);

    function onClick(e) {
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
            <h1>Todos los países del mundo</h1>
            <SearchBar />
            <Link to="/activity"><button>Crear actividad</button></Link>
            <button onClick={e => {onClick(e)}}>Volver a cargar todos los países</button>
            <div className="container-filter">
                <div className="filter">
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
                <div className="filter">
                    <span>Filter by activity</span>
                    <select onChange={e => {handleFilterByActivity(e)}}>
                        <option value="All">All</option>
                        { allActivities ? allActivities.map(e => <option value={e.name}>{e.name}</option>) : <option>Not found</option> }
                    </select>
                </div>
                <div className="filter">
                    <span>Filter by alphabet</span>
                    <select onChange={e => {handleSort(e)}}>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>
                <div className="filter">
                    <span>Filter by population</span>
                    <select onChange={e => {handleFilterByPopulation(e)}}>
                        <option value="asc">Ascendent</option>
                        <option value="des">Descendent</option>
                    </select>
                </div>
            </div>
            <div>
                <Paginado countriesPerPage={countriesPerPage} allCountries={allCountries.length} paginado={paginado} />
                <div className="container-card">
                    { currentCountries?.map(e => <Link to={"/home/" + e.cca3}><Card key={e.cca3} cca3={e.cca3} name={e.name} image={e.flags[0]} continent={e.continent} population={e.population} /></Link>) }
                </div>
            </div>
        </div>
    );
};
