const { Router } = require('express');
const { Country, Activity, countries_activities } = require('../db');
const models = require('./model');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", async (req, res) => {
    const name = req.query.name;
    const countries = await Country.findAll({ order: [ [ "name", "ASC" ] ] });
    const activitiesDb = await Activity.findAll();
    if(countries.length > 0) {
        if(name) {
            const countryInfo = countries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()));

            // actividades
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
            // actividades

            if(detail.length > 0) {
                res.json(detail);
            }else {
                res.status(404).json({ msg: `No se encontró ningún país que coincida con el nombre: ${name}` });
            };
        }else {
            // actividades
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
            // actividades
            res.json(countryInfo);
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

            // actividades
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
            // actividades

            if(detail.length > 0) {
                res.json(detail);
            }else {
                res.status(404).json({ msg: `No se encontró ningún país que contenga el código: ${cca3}` });
            };
        }else {
            res.json(countries);
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
    res.json({ msg: "Actividad creada corectamente" });
});

router.get("/activities", async (req, res) => {
    const actividades = await Activity.findAll();
    res.json(actividades);
});

module.exports = router;
