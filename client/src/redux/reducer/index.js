import { GET_ALL_COUNTRIES, SEARCH_COUNTRY, GET_DETAIL, GET_ACTIVITIES, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITY, FILTER_SORT, FILTER_BY_POPULATION, POST_ACTIVITY } from "../actions";

const initialState = {
    countries: [],
    allCountries: [],
    detail: [],
    activities: [],
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
            };
        case SEARCH_COUNTRY:
            return {
                ...state,
                countries: action.payload,
            };
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload,
            };
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
            };
        case FILTER_BY_CONTINENT:
            const filteredCountries = state.allCountries;
            const continentFiltered = action.payload === "All" ? filteredCountries : filteredCountries.filter(e => e.continent === action.payload);
            return {
                ...state,
                countries: continentFiltered,
            };
        case FILTER_BY_ACTIVITY:
            const filteredCountries2 = state.allCountries;
            const activityFiltered = filteredCountries2.filter(e => {
                const activities = e.activities.map(el => el.name);
                return activities.includes(action.payload);
            });
            const countriesWithActivities = filteredCountries2.filter(e => e.activities.length > 0);
            return {
                ...state,
                countries: action.payload === "All" ? countriesWithActivities : activityFiltered,
            };
        case FILTER_SORT:
            const sortCountries = action.payload === "A-Z" ?
                state.countries.sort((a, b) => {
                    if(a.name < b.name) {
                        return -1;
                    };
                    if(a.name > b.name) {
                        return 1;
                    };
                    return 0;
                }) :
                state.countries.sort((a, b) => {
                    if(a.name < b.name) {
                        return 1;
                    };
                    if(a.name > b.name) {
                        return -1;
                    };
                    return 0;
                });
            return {
                ...state,
                countries: sortCountries,
            };
        case FILTER_BY_POPULATION:
            const populationFiltered = action.payload === "asc" ?
                state.countries.sort((a, b) => {
                    if(a.population < b.population) {
                        return -1;
                    };
                    if(a.population > b.population) {
                        return 1;
                    };
                    return 0;
                }) :
                state.countries.sort((a, b) => {
                    if(a.population < b.population) {
                        return 1;
                    };
                    if(a.population > b.population) {
                        return -1;
                    };
                    return 0;
                });
            return {
                ...state,
                countries: populationFiltered,
            };
        case POST_ACTIVITY:
            return {
                ...state,
            };
        default:
            return state;
    };
};

export default reducer;
