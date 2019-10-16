const fetch = require('node-fetch')

const getWeather = async (city) => {
    const url = `http://www.mxnzp.com/api/weather/current/${encodeURI(city)}`
    const response = await fetch(url)
    if(response.status !== 200) {
        throw new Error(response.statusText)
    }
    return await response.json()
}

const showCurrentWeather = async (city) => {
    try {
        const weather = await getWeather(city)
        console.log(`城市：${weather.data.address}`)
        console.log(`天气：${weather.data.weather}`)
    } catch (err) {
        console.error(err)
    }
}

showCurrentWeather('太原市')