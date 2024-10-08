const historyQueryString = "https://archive-api.open-meteo.com/v1/archive?";

async function loadFetch(longitude, latitude, date) {
    let data = null;
    
    await fetch(makeURL(longitude, latitude, date))
    .then(x => x.json())
    .then(x => data = x)
    .catch(x => console.log("Error happened"));

    return data;
}

async function averageTemperature(longitude, latitude, date) {
    let data = await loadFetch(longitude, latitude, date);
    let array = data.hourly.temperature_2m;
    let avg = array.reduce((a, b) => a + b) / array.length;
    return Math.floor(avg);
}

function makeURL(longitude, latitude, date) {
    return `${historyQueryString}longitude=${longitude}&latitude=${latitude}&start_date=${date}&end_date=${date}&hourly=temperature_2m`;
}

async function f1 (lat, long, timeStr) {
    return averageTemperature(long, lat, timeStr);
}

module.exports = f1;