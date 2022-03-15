import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { countryDetail } from '../redux/actions';

export default function Detail(props) {
    const dispatch = useDispatch();
    const myCountry = useSelector(state => state.detail);

    useEffect(() => {
        dispatch(countryDetail(props.match.params.cca3));
    }, [dispatch, props.match.params.cca3]);

    return (
        <div>
            { myCountry.length > 0 ?
                <div>
                    <Link to="/home"><button>Volver</button></Link>
                    <h1>Nombre: {myCountry[0].name}</h1>
                    <h5>Código de país: {myCountry[0].cca3}</h5>
                    <img alt ="img" src={myCountry[0].flags[1]} />
                    <h5>Continente: {myCountry[0].continent}</h5>
                    <h5>Capital: {myCountry[0].capital}</h5>
                    <h5>Subregion: {myCountry[0].subregion}</h5>
                    <h5>Área: {myCountry[0].area}</h5>
                    <h5>Población: {myCountry[0].population}</h5>
                    {
                        myCountry[0].activities.length > 0 &&
                        <h3>Actividades:</h3>
                    }
                    { myCountry[0].activities.length > 0 &&
                        myCountry[0].activities.map(e => {
                            return (
                                <div>
                                    <p>Name: {e.name}</p>
                                    <p>Difficulty: {e.difficulty}</p>
                                    <p>Duration: {e.duration}</p>
                                    <p>Season: {e.season}</p>
                                </div>
                            );
                        })
                    }
                </div>
                :
                <p>Loading...</p>
            }
        </div>
    );
};
