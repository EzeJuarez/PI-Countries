import './styles/ActivityCreate.css';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import { getAllCountries, postActivity } from '../redux/actions';

function validates(input) {
    let error = {};
    if(!input.name) {
        error.name = "Name is required";
    }else if(input.difficulty === 0) {
        error.difficulty = "Select a difficulty between 1 and 5";
    }else if(!input.duration) {
        error.duration = "Duration is required";
    }else if(input.season.length === 0) {
        error.season = "Must select at least one season";
    }else if(input.country.length === 0) {
        error.country = "Must select at least one country";
    };
    return error;
};

export default function ActivityCreate() {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.allCountries);
    const history = useHistory();
    const [ input, setInput ] = useState({
        name: "",
        difficulty: 0,
        duration: "",
        season: [],
        country: [],
    });
    const [ error, setError ] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        country: "",
    });

    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch]);

    function onChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setError(validates({
            ...input,
            [e.target.name]: e.target.value,
        }));
    };
    function onCheck(e) {
        if(e.target.checked) {
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            });
        };
    };
    function onSelectSeason(e) {
        if(e.target.checked) {
            setInput({
                ...input,
                season: [...input.season, e.target.value],
            });
        };
        if(!e.target.checked) {
            setInput({
                ...input,
                season: input.season.filter(el => el !== e.target.value),
            });
        };
    };
    function onSelect(e) {
        setInput({
            ...input,
            country: [...input.country, e.target.value],
        });
    };
    function onSubmit(e) {
        e.preventDefault();
        if(!error.name && !error.difficulty && !error.duration && !error.season && !error.country) {
            dispatch(postActivity(input));
            setInput({
                name: "",
                difficulty: 0,
                duration: "",
                season: [],
                country: [],
            });
            alert("Activity created");
            history.push("/home");
        }else {
            alert("Compleat all");
        };
    };
    function onDelete(e) {
        e.preventDefault();
        setInput({
            ...input,
            country: input.country.filter(el => el !== e.target.value),
        });
    };

    return (
        <div className="container-create">
            <div className="container-button-back">
                <Link to="/home"><button className="button-back">Back</button></Link>
            </div>
            <div className="container-create-activity">
                <div className="create-activity">
                    <h1>Create activity</h1>
                    <form onSubmit={e => {onSubmit(e)}}>
                        <div className="element-create">
                            <label className="label">Name: </label>
                            <input type="text" name="name" value={input.name} onChange={e => {onChange(e)}} />
                            { error.name && <p className="error">{error.name}</p> }
                        </div>
                        <div className="element-create">
                            <label className="label">Difficulty: </label>
                            <label>1</label>
                            <input type="radio" name="difficulty" value="1" onChange={e => {onCheck(e)}} />
                            <label>2</label>
                            <input type="radio" name="difficulty" value="2" onChange={e => {onCheck(e)}} />
                            <label>3</label>
                            <input type="radio" name="difficulty" value="3" onChange={e => {onCheck(e)}} />
                            <label>4</label>
                            <input type="radio" name="difficulty" value="4" onChange={e => {onCheck(e)}} />
                            <label>5</label>
                            <input type="radio" name="difficulty" value="5" onChange={e => {onCheck(e)}} />
                            { error.difficulty && <p className="error">{error.difficulty}</p> }
                        </div>
                        <div className="element-create">
                            <label className="label">Duration: </label>
                            <input type="text" value={input.duration} name="duration" onChange={e => {onChange(e)}} />
                            { error.duration && <p className="error">{error.duration}</p> }
                        </div>
                        <div className="element-create">
                            <label className="label">Season: </label>
                            <label>Summer</label>
                            <input type="checkbox" name="season" value="Summer" onChange={e => {onSelectSeason(e)}} />
                            <label>Fall</label>
                            <input type="checkbox" name="season" value="Fall" onChange={e => {onSelectSeason(e)}} />
                            <label>Winter</label>
                            <input type="checkbox" name="season" value="Winter" onChange={e => {onSelectSeason(e)}} />
                            <label>Spring</label>
                            <input type="checkbox" name="season" value="Spring" onChange={e => {onSelectSeason(e)}} />
                            { error.season && <p className="error">{error.season}</p> }
                        </div>
                        <div className="element-create">
                            <label className="label">Countries: </label>
                            <select onChange={e => {onSelect(e)}}>
                                { countries?.map(e => <option key={e.cca3} value={e.name}>{e.name}</option>) }
                            </select>
                            { error.country && <p className="error">{error.country}</p> }
                        </div>
                        <button type="submit" className="button-create">Create</button>
                    </form>
                </div>
                {input.country &&
                    <div className="list-countries">
                        <span className="span-title">List of countries:</span>
                        { input.country.map((e, i) => <p key={i} className="country">{e} <button value={e} onClick={e =>{onDelete(e)}} className="button-delete">x</button></p>) }
                    </div>
                }
            </div>
        </div>
    );
};
