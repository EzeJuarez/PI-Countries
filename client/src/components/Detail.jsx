import './styles/Detail.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearDetail, countryDetail } from '../redux/actions';

export default function Detail(props) {
    const dispatch = useDispatch();
    const myCountry = useSelector(state => state.detail);

    useEffect(() => {
        dispatch(countryDetail(props.match.params.cca3));
        dispatch(clearDetail());
    }, [dispatch, props.match.params.cca3]);

    return (
        <div>

            <div className="container-button">
                <Link to="/home"><button>Back</button></Link>
            </div>

            { myCountry.length > 0 ?
                <div className="container-detail">

                    <div className="image-detail">
                        <img alt ="img" src={myCountry[0].flags[1]} />
                    </div>

                    <div className="country-detail">
                        <h1>Name: {myCountry[0].name}</h1>
                        <h3>Country code: {myCountry[0].cca3}</h3>
                        <h3>Continent: {myCountry[0].continent}</h3>
                        <h3>Capital: {myCountry[0].capital}</h3>
                        <h3>Subregion: {myCountry[0].subregion}</h3>
                        <h3>Area: {myCountry[0].area}</h3>
                        <h3>Population: {myCountry[0].population}</h3>
                    </div>

                    { myCountry[0].activities.length > 0 &&
                        <div className="container-activity-detail">
                            <h2>Activities:</h2>
                            <div className="activity-detail">

                                { myCountry[0].activities.length > 0 &&
                                    myCountry[0].activities.map(e => {
                                        return (
                                            <div key={e.id} className="activity">
                                                <h5>Name: {e.name}</h5>
                                                <h5>Difficulty: {e.difficulty}</h5>
                                                <h5>Duration: {e.duration}</h5>
                                                <h5>Season: {e.season.map(e => e + ". ")}</h5>
                                            </div>
                                        );
                                    })
                                }

                            </div>
                        </div>
                    }
                </div>
            :
                <p className="loading">Loading...</p>
            }
        </div>
    );
};
