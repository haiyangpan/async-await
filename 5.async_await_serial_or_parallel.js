const fetch = require('node-fetch')

const sleep = (timeout = 2000) => new Promise(resolve => {
    setTimeout(resolve, timeout)
})

const getWeather = async (city) => {
    await sleep()
    const url = `http://www.mxnzp.com/api/weather/current/${encodeURI(city)}`
    const response = await fetch(url)
    return await response.json()
}

const showWeather = async () => {
    console.time('showWeather')
    // 串行
    // const ty = await getWeather('太原')
    // const sy = await getWeather('三亚')

    // 并行 (运行时间约为串行一半)
    // 并行 方法一
    // const tyPromise = getWeather('太原')
    // const syPromise = getWeather('三亚')
    // const ty = await tyPromise
    // const sy = await syPromise

    // 并行 方法二
    const [ty, sy] = await Promise.all([
        getWeather('太原'),
        getWeather('三亚')
    ])

    console.log('并行2')

    console.log(`城市：${ty.data.address}`)
    console.log(`天气：${ty.data.weather}`)

    console.log(`城市：${sy.data.address}`)
    console.log(`天气：${sy.data.weather}`)

    console.timeEnd('showWeather')
}

showWeather()