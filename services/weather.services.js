const axios = require('axios')

/* class WeatherService {
  constructor() {
    this.api = axios.create({
      baseURL:  "https://foreca-weather.p.rapidapi.com"
    });
  }

  getLocation = (city) => {
    return this.api.get(`/location/search/${city}`)
  }

  getNowcast = (locationId) => {
    return  this.api.get(`/forecast/15minutely/${locationId}`)
  }

}

module.exports =  WeatherService */

const config = {
  headers: {
    'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com',
    'X-RapidAPI-Key': 'fd22c19700msh323061179916009p1cd6afjsn71d33392bb38'
  },
  params: {lang: 'en', country: 'es'},
}

const getLocationId = async (city) => {
	const res = await axios.get(
    `https://foreca-weather.p.rapidapi.com/location/search/${encodeURI(city)}`,	
    config
  );
	return res.data.locations?.[0]?.id;
};

const getNowcast = async (locationId) => {
  console.log(locationId)
  const response = await axios.get(
    `https://foreca-weather.p.rapidapi.com/forecast/15minutely/${locationId}`,
    config
  );
  return response.data
}

module.exports = {
  getLocationId,
  getNowcast
};