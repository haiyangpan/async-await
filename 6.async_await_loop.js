const fetch = require('node-fetch')
const bluebird = require('bluebird')

const getWeather = async (city) => {
    await bluebird.delay(2000)
    const url = `http://www.mxnzp.com/api/weather/current/${encodeURI(city)}`
    const response = await fetch(url)
    return await response.json()
}

const showWeather = async () => {
    console.time('showWeather')

    // loop multiple
    const citys = ['太原', '三亚']
    const promises = citys.map(v => getWeather(v))
    for(const promise of promises) {
        const city = await promise
        console.log(`城市：${city.data.address}`)
        console.log(`天气：${city.data.weather}`)
    }

    console.timeEnd('showWeather')
}

showWeather()