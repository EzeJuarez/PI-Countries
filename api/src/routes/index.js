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
                capital: e.capital ? e.capital[0] : "No tiene capital",
                subregion: e.subregion ? e.subregion : "Sin información",
                area: e.area + " km2",
                population: e.population,
            },
        });
    });
}();

router.get("/countries", async (req, res) => {
    const name = req.query.name;
    const countries = await Country.findAll({ order: [ [ "name", "ASC" ] ] });
    const activitiesDb = await Activity.findAll();
    if(countries.length > 0) {
        if(name) {
            const countryInfo = countries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()));
            if(countryInfo.length > 0) {
                const detail = countryInfo.map(e => {
                    return {
                        cca3: e.cca3,
                        name: e.name,
                        flags: e.flags,
                        continent: e.continent,
                        capital: e.capital,
                        subregion: e.subregion,
                        area: e.area,
                        population: e.population,
                        activities: activitiesDb.filter(el => el.country.includes(e.name)),
                    };
                });
                res.status(200).json(detail);
            }else {
                res.status(404).json({ msg: `No se encontró ningún país que coincida con el nombre: ${name}` });
            };
        }else {
            const countryInfo = countries.map(e => {
                return {
                    cca3: e.cca3,
                    name: e.name,
                    flags: e.flags,
                    continent: e.continent,
                    capital: e.capital,
                    subregion: e.subregion,
                    area: e.area,
                    population: e.population,
                    activities: activitiesDb.filter(el => el.country.includes(e.name)),
                };
            });
            res.status(200).json(countryInfo);
        };
    }else {
        res.status(404).json({ msg: "Ocurrió un error en la llamada de la información" });
    };
});

router.get("/countries/:cca3", async (req, res) => {
    const { cca3 } = req.params;
    const countries = await Country.findAll({ order: [ [ "name", "ASC" ] ] });
    const activitiesDb = await Activity.findAll();
    if(countries.length > 0) {
        if(cca3) {
            const countryInfo = countries.filter(country => country.cca3.toLowerCase().includes(cca3.toLowerCase()));
            if(countryInfo.length > 0) {
                const detail = countryInfo.map(e => {
                    return {
                        cca3: e.cca3,
                        name: e.name,
                        flags: e.flags,
                        continent: e.continent,
                        capital: e.capital,
                        subregion: e.subregion,
                        area: e.area,
                        population: e.population,
                        activities: activitiesDb.filter(el => el.country.includes(e.name)),
                    };
                });
                res.status(200).json(detail);
            }else {
                res.status(404).json({ msg: `No se encontró ningún país que contenga el código: ${cca3}` });
            };
        }else {
            res.status(200).json(countries);
        };
    }else {
        res.status(404).json({ msg: "Ocurrió un error en la llamada de la información" });
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
    res.status(200).json({ msg: "Actividad creada corectamente" });
});

router.get("/activities", async (req, res) => {
    const actividades = await Activity.findAll();
    res.status(200).json(actividades);
});

module.exports = router;
