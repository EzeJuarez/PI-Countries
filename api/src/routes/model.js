const axios = require('axios');
const { Country } = require('../db');

const getCountriesInfo = async function() {
    const apiInfo = await axios.get('https://restcountries.com/v3/all');
    apiInfo.data.forEach(e => {
        Country.findOrCreate({
            where: {
                cca3: e.cca3,
                name: e.name.common,
                flags: e.flags,
                continent: e.continents[0],
                capital: e.capital ? e.capital[0] : "No tiene capital",
                subregion: e.subregion ? e.subregion : "Sin información",
                area: e.area + " km2",
                population: e.population,
            },
        });
    });
}();

module.exports = {
    getCountriesInfo,
};
