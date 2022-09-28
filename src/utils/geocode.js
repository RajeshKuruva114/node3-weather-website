const request = require("request");

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=b241894dce2512dac7c88dffda684c5c&query=${encodeURIComponent(address)}&limit=1`;
    // console.log(urlGeo);
    request({url: url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback("Unable to connect to the location services", undefined);
        } else if (body.error || (body.data === [])) {
            callback("Unable to find the location", undefined);
        } else {
            // console.log(response.body);
            callback(undefined,{
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].name,
                country: body.data[0].country
            });
        }
        
    });
}

module.exports = geocode; 