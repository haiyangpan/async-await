const bluebird = require('bluebird')

const sleep = async () => {
    console.log('waiting...')
    await bluebird.delay(2000)
    console.log('done!')

}

sleep()