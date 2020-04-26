const got = require('got')
//////////////////////////////// GEOCODE CALL API WHIT A CALLBACK FUNCION/////////////////////////////////////

const forecast = (longitud,latitud,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=fccef588334e297eb804fde688ec9c3d&query=${longitud},${latitud}`

    got(url)
    .then(({body}) => {
        const {current} =JSON.parse(body)
        callback(
            {forecastResponse :`${current.weather_descriptions[0]} It is currently ${current.temperature} degress out. It feels like ${current.feelslike} degress out and the humidity is ${current.humidity}%`}
        )
    })
    .catch(error => {
        console.log('this is an error, introdusca coordenadas correctas',error);
    });

}

module.exports=forecast