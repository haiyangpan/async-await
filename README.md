@[TOC]
# async/await 
## 异步与同步
1. 同步：同一线程之中，顺序完成不同的操作，是一种阻塞模式；后一个请求操作需要等待前一个操作完成之后，才能发出。
2. 异步：需要开启不同的线程，是非阻塞模式。

    同步类似于打电话，而异步相当于发短信。
## async/await基础使用
发送请求获取天气异步操作,利用node-fetch完成请求
```javascript
const fetch = require("node-fetch");

async function getWeather(city) {
    const url = `http://www.mxnzp.com/api/weather/current/${encodeURI(city)}`;
    const response = await fetch(url)
    const {data} = await response.json()
    console.log(data)
}

getWeather('深圳')
```
## async/await搭配then使用
```javascript
const fetch = require("node-fetch");

async function getWeather(city) {
    const url = `http://www.mxnzp.com/api/weather/current/${encodeURI(city)}`;
    const response = await fetch(url)
    return await response.json()
}

getWeather('深圳')
    .then(({data}) => {
        console.log(`城市：${data.address}`)
        console.log(`天气：${data.weather}`)
    })
```
## async/await作用于对象
理论上可以作用在所有的对象上，但是非Promise对象都会通过Promise.resolve()转成Promise对象
```javascript
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
```
## async/await串行与并行
1. 串行是指多个任务时，各个任务按顺序执行，完成一个之后才能进行下一个。
2. 并行指的是多个任务可以同时执行。异步是多个任务并行的前提条件。并行用时更短。
    ### 并行的方式
    1. 将请求先赋给变量，await请求变量
    2. 通过Promise.all(),传入一个请求数组
```javascript
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
```
## async/await 循环并行处理
```javascript
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
```

