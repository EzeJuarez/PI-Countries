import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import { getAllCountries, postActivity } from '../redux/actions';

function validates(input) {
    let error = {};
    if(!input.name) {
        error.name = "Este campo es obligatorio";
    }else if(!input.difficulty) {
        error.difficulty = "Este campo es obligatorio";
    }else if(!input.duration) {
        error.duration = "Este campo es obligatorio";
    }else if(!input.season) {
        error.season = "Este campo es obligatorio";
    }else if(!input.country.length === 0) {
        error.country = "Este campo es obligatorio";
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
        season: "",
        country: [],
    });
    const [ error, setError ] = useState({});

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
    function onSelect(e) {
        setInput({
            ...input,
            country: [...input.country, e.target.value],
        });
    };
    function onSubmit(e) {
        e.preventDefault();
        dispatch(postActivity(input));
        setInput({
            name: "",
            difficulty: 0,
            duration: "",
            season: "",
            country: [],
        });
        alert("La actividad fue creada");
        history.push("/home");
    };

    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crear actividad</h1>
            <form onSubmit={e => {onSubmit(e)}}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="name" value={input.name} onChange={e => {onChange(e)}} />
                    { error.name && <p>{error.name}</p> }
                </div>
                <div>
                    <label>Dificultad:</label>
                    <label>1</label>
                    <input type="checkbox" name="difficulty" value="1" onChange={e => {onCheck(e)}} />
                    <label>2</label>
                    <input type="checkbox" name="difficulty" value="2" onChange={e => {onCheck(e)}} />
                    <label>3</label>
                    <input type="checkbox" name="difficulty" value="3" onChange={e => {onCheck(e)}} />
                    <label>4</label>
                    <input type="checkbox" name="difficulty" value="4" onChange={e => {onCheck(e)}} />
                    <label>5</label>
                    <input type="checkbox" name="difficulty" value="5" onChange={e => {onCheck(e)}} />
                </div>
                <div>
                    <label>Duración:</label>
                    <input type="text" value={input.duration} name="duration" onChange={e => {onChange(e)}} />
                </div>
                <div>
                    <label>Temporada:</label>
                    <label>Verano</label>
                    <input type="checkbox" name="season" value="Verano" onChange={e => {onCheck(e)}} />
                    <label>Otoño</label>
                    <input type="checkbox" name="season" value="Otoño" onChange={e => {onCheck(e)}} />
                    <label>Invierno</label>
                    <input type="checkbox" name="season" value="Invierno" onChange={e => {onCheck(e)}} />
                    <label>Primavera</label>
                    <input type="checkbox" name="season" value="Primavera" onChange={e => {onCheck(e)}} />
                </div>
                <div>
                    <label>Países:</label>
                    <select onChange={e => {onSelect(e)}}>
                        { countries?.map(e => <option key={e.cca3} value={e.name}>{e.name}</option>) }
                    </select>
                    <ul><li>{ input.country.map(e => e + ". ") }</li></ul>
                </div>
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};
