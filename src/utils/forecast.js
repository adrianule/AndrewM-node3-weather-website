const request = require('request')




const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ce11b6e9c46f60e615c9b7539c0130a1&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, {body}) => {
       if (error) {
          callback ('Unable to connect to weather app', undefined)
       } else if (body.error) {
          callback ('Unable to find location', undefined)
       } else {
          callback(undefined, body.current.weather_descriptions[0] + '. Temp is ' + body.current.temperature + ' F feels like ' + body.current.feelslike + ' F. There is '+ body.current.precip + '% chances of rain.' )
       }
    })
 }

module.exports = forecast