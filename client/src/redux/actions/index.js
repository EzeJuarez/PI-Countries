import axios from 'axios';

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const GET_DETAIL = "GET_DETAIL";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const FILTER_SORT = "FILTER_SORT";
export const FILTER_BY_POPULATION = "FILTER_BY_POPULATION";
export const POST_ACTIVITY = "POST_ACTIVITY";

// export const getAllCountries = () => dispatch => {
//     return fetch("http://localhost:3001/countries")
//     .then(res => res.json())
//     .then(json => {
//         dispatch({
//             type: GET_ALL_COUNTRIES,
//             payload: json,
//         });
//     })
//     .catch(err => {
//         console.log(err);
//     });
// };

export const getAllCountries = () => {
    return async function(dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/countries");
            return dispatch({
                type: GET_ALL_COUNTRIES,
                payload: json.data,
            });
        }catch(err) {
            console.log(err);
        };
    };
};

// export const searchCountry = (name) => dispatch => {
//     return fetch("http://localhost:3001/countries?name=" + name)
//     .then(res => res.json())
//     .then(json => {
//         dispatch({
//             type: SEARCH_COUNTRY,
//             payload: json,
//         });
//     })
//     .catch(err => {
//         console.log(err);
//     });
// };

export const searchCountry = (name) => {
    return async function(dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/countries?name=" + name);
            return dispatch({
                type: SEARCH_COUNTRY,
                payload: json.data,
            });
        }catch(err) {
            console.log(err);
        };
    };
};

// export const countryDetail = (cca3) => dispatch => {
//     return fetch("http://localhost:3001/countries/" + cca3)
//     .then(res => res.json())
//     .then(json => {
//         dispatch({
//             type: GET_DETAIL,
//             payload: json,
//         });
//     })
//     .catch(err => {
//         console.log(err);
//     });
// };

export const countryDetail = (cca3) => {
    return async function(dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/countries/" + cca3);
            return dispatch({
                type: GET_DETAIL,
                payload: json.data,
            });
        }catch(err) {
            console.log(err);
        };
    };
};

export const getActivities = () => dispatch => {
    return fetch("http://localhost:3001/activities")
    .then(res => res.json())
    .then(json => {
        dispatch({
            type: GET_ACTIVITIES,
            payload: json,
        });
    })
    .catch(err => {
        console.log(err);
    });
};

// export const getActivities = () => {
//     return async function(dispatch) {
//         try {
//             const json = await axios.get("http://localhost:3001/activities");
//             return dispatch({
//                 type: GET_ACTIVITIES,
//                 payload: json.data,
//             });
//         }catch (err) {
//             console.log(err);
//         };
//     };
// };

export const filterByContinent = (payload) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload,
    };
};

export const filterByActivity = (payload) => {
    return {
        type: FILTER_BY_ACTIVITY,
        payload,
    };
};

export const filterSort = (payload) => {
    return {
        type: FILTER_SORT,
        payload,
    };
};

export const filterByPopulation = (payload) => {
    return {
        type: FILTER_BY_POPULATION,
        payload,
    };
};

export const postActivity = (payload) => {
    return async function() {
        const json = await axios.post("http://localhost:3001/activity", payload);
        return json;
    };
};
