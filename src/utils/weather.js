const request = require('request')

const weather = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=350efc1f549e8e758b98f84897851aa4&query=' + encodeURIComponent(address)

    request({ url: url, json: true }, (error, response) => {


        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.error) {

            callback('Unable to find location. Try another search', undefined)

        } else {
            callback(undefined, {
                temperature: ' the current temperature in ' + response.body.location.name + ' ' + response.body.current.temperature + ' ' + response.body.current.weather_descriptions,

            })
        }


    })
}


module.exports = weather