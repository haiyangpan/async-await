const fetch = require("node-fetch");

async function getWeather(city) {
    console.time('getCurrentWeather')
    const url = `http://www.mxnzp.com/api/weather/current/${encodeURI(city)}`;
    console.log(url)
    const response = await fetch(url)
    const {data} = await response.json()
    console.log(data)
    console.timeEnd('getCurrentWeather')
}

getWeather('深圳')