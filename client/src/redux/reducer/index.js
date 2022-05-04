import { GET_ALL_COUNTRIES, SEARCH_COUNTRY, GET_DETAIL, CLEAR_DETAIL, GET_ACTIVITIES, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITY, FILTER_SORT, FILTER_BY_POPULATION, POST_ACTIVITY } from "../actions";

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
        case CLEAR_DETAIL:
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
            const allCountriesContinent = state.allCountries;
            const continentFiltered = allCountriesContinent.filter(country => country.continent === action.payload);
            return {
                ...state,
                countries: action.payload === "All" ? allCountriesContinent : continentFiltered,
            };
        case FILTER_BY_ACTIVITY:
            const allCountriesActivity = state.allCountries;
            const activityFiltered = allCountriesActivity.filter(country => {
                const activities = country.activities.map(activity => activity.name);
                return activities.includes(action.payload);
            });
            const countriesWithActivities = allCountriesActivity.filter(country => country.activities.length > 0);
            return {
                ...state,
                countries: action.payload === "All" ? countriesWithActivities : activityFiltered,
            };
        case FILTER_SORT:
            const sortCountries = action.payload === "A-Z" ?
                state.countries.sort((a, b) => {
                    if(a.name < b.name) {
                        return - 1;
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
                        return - 1;
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
                        return - 1;
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
                        return - 1;
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
