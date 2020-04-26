const got = require('got')
//////////////////////////////// GEOCODE CALL API WHIT A CALLBACK FUNCION/////////////////////////////////////

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoiam9zZWRsY2EiLCJhIjoiY2s5NGk0ZHJkMGNwZDNlcWU3OHYwMW0xMiJ9.0J3IUaK3w5QXzHp2-3CIeQ&limit=1`

    got(url)
        .then(({body}) =>{
            const {features} = JSON.parse(body)
            callback(undefined,
                {
                    latitude: features[0].center[0],
                    longitude: features[0].center[1],
                    location: features[0].place_name
                }
            )
        })
        .catch(error =>{
            callback('Unable to connect to location services!', undefined)
        })
}

module.exports=geocode