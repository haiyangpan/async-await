const fetch = require("node-fetch");

class APIWeather {
    async getCurrentWeather(city) {
        const url = `http://www.mxnzp.com/api/weather/current/${encodeURI(city)}`
        const response = await fetch(url)
        return await response.json()
    }
}
;(async () => {
    const cityWeatherApi = new APIWeather()
    const cityWeather = await cityWeatherApi.getCurrentWeather('天津')
    console.log(`城市：${cityWeather.data.address}`)
    console.log(`天气：${cityWeather.data.weather}`)
})()