/*
Készítsd el az előző feladat azon változatát ahol megadjuk az óraszámot is.
Csak az adott órára vonatkozó hőmérséklettel térjen vissza a függvény.
*/

const historyQueryString = "https://archive-api.open-meteo.com/v1/archive?";

async function loadFetch(longitude, latitude, date) {
    let data = null;
    
    await fetch(makeURL(longitude, latitude, date))
    .then(x => x.json())
    .then(x => data = x)
    .catch(x => console.log("Error happened"));

    return data;
}

async function getTemperatureByHour(longitude, latitude, date, hour) {
    let data = await loadFetch(longitude, latitude, date);
    return data.hourly.temperature_2m[hour];
}

function makeURL(longitude, latitude, date) {
    return `${historyQueryString}longitude=${longitude}&latitude=${latitude}&start_date=${date}&end_date=${date}&hourly=temperature_2m`;
}

const locations = require('../locations.json');

const f2 = async (lat, long, timeStr, hour) => {
    return getTemperatureByHour(long, lat, timeStr, hour);
}
module.exports = f2;