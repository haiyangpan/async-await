const fetch = require("node-fetch");

async function getWeather(city) {
    console.time('getCurrentWeather')
    const url = `http://www.mxnzp.com/api/weather/current/${encodeURI(city)}`;
    const response = await fetch(url)
    return await response.json()
   
}

getWeather('深圳')
    .then(({data}) => {
        console.log(`城市：${data.address}`)
        console.log(`天气：${data.weather}`)
    })