/*
const url = "http://api.weatherstack.com/current?access_key=83402e474ff4e9600886198180d971ea&query=37.8267,-122.4233&units=s";

request({url: url, json: true}, (error, response) => {
    // const data = JSON.parse(response.body);
    // console.log(response.body.current);
    if(error) {
        console.log("Unable to get the weather data");
    } else if(response.body.error) {
        console.log("Unable to find the location");
    }else {
        console.log(`${response.body.current.weather_descriptions[0]}: It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`);
    }
})
${encodeURIComponent(lat)},${encodeURIComponent(long)}
*/
const request = require('request');
const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=83402e474ff4e9600886198180d971ea&query="+lat+","+long+"&units=m";
    // console.log(lat,long);
    request({url, json: true}, (error, {body} ={}) => {
        // console.log(response.body)
        // console.log(url)
        if(error) {
            callback("Unable to get the weather data", undefined);
            // console.log("if")
        } else if(body.error) {
            callback("Unable to find the location", undefined);
            // console.log("el if")
        }else {
            callback(undefined, `${body.current.weather_descriptions[0]}: It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);
            // console.log('else')
        } 
    });   
}
module.exports = forecast;