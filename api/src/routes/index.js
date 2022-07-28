const { Router } = require('express');
const axios = require('axios');
const { Country, Activity } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getCountriesInfo = async function() {
    const apiInfo = await axios.get('https://restcountries.com/v3/all');
    apiInfo.data.forEach(e => {
        Country.findOrCreate({
            where: {
                cca3: e.cca3,
                name: e.name.common,
                flags: e.flags,
                continent: e.continents[0],
                capital: e.capital ? e.capital[0] : "No capital",
                subregion: e.subregion ? e.subregion : "No information",
                area: e.area + " km2",
                population: e.population,
            },
        });
    });
}();

router.get("/countries", async (req, res) => {
    const name = req.query.name;
    const countriesDb = await Country.findAll({ order: [ [ "name", "ASC" ] ] });
    const activitiesDb = await Activity.findAll();
    if(countriesDb.length > 0) {
        if(name) {
            const countryInfo = countriesDb.filter(country => country.name.toLowerCase().includes(name.toLowerCase()));
            if(countryInfo.length > 0) {
                const detail = countryInfo.map(country => {
                    return {
                        cca3: country.cca3,
                        name: country.name,
                        flags: country.flags,
                        continent: country.continent,
                        capital: country.capital,
                        subregion: country.subregion,
                        area: country.area,
                        population: country.population,
                        activities: activitiesDb.filter(activity => activity.country.includes(country.name)),
                    };
                });
                res.status(200).json(detail);
            }else {
                res.status(404).json({ msg: `Not found a country with name: ${name}` });
            };
        }else {
            const countries = countriesDb.map(country => {
                return {
                    cca3: country.cca3,
                    name: country.name,
                    flags: country.flags,
                    continent: country.continent,
                    population: country.population,
                    activities: activitiesDb.filter(activity => activity.country.includes(country.name)),
                };
            });
            res.status(200).json(countries);
        };
    }else {
        res.status(404).json({ msg: "Error to get information" });
    };
});

router.get("/countries/:cca3", async (req, res) => {
    const { cca3 } = req.params;
    const countriesDb = await Country.findAll({ order: [ [ "name", "ASC" ] ] });
    const activitiesDb = await Activity.findAll();
    if(countriesDb.length > 0) {
        if(cca3) {
            const countryInfo = countriesDb.filter(country => country.cca3.toLowerCase().includes(cca3.toLowerCase()));
            if(countryInfo.length > 0) {
                const detail = countryInfo.map(country => {
                    return {
                        cca3: country.cca3,
                        name: country.name,
                        flags: country.flags,
                        continent: country.continent,
                        capital: country.capital,
                        subregion: country.subregion,
                        area: country.area,
                        population: country.population,
                        activities: activitiesDb.filter(activity => activity.country.includes(country.name)),
                    };
                });
                res.status(200).json(detail);
            }else {
                res.status(404).json({ msg: `Not found a country with code: ${cca3}` });
            };
        }else {
            const countries = countriesDb.map(country => {
                return {
                    cca3: country.cca3,
                    name: country.name,
                    flags: country.flags,
                    continent: country.continent,
                    population: country.population,
                    activities: activitiesDb.filter(activity => activity.country.includes(country.name)),
                };
            });
            res.status(200).json(countries);
        };
    }else {
        res.status(404).json({ msg: "Error to get information" });
    };
});

router.post("/activity", async (req, res) => {
    const { name, difficulty, duration, season, country } = req.body;
    const newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
        country,
    });
    const countriesInDb = await Country.findAll({
        where: { name: country },
    });
    newActivity.addCountries(countriesInDb);
    res.status(200).json({ msg: "Activity created" });
});

router.get("/activities", async (req, res) => {
    const activities = await Activity.findAll();
    res.status(200).json(activities);
});

module.exports = router;
