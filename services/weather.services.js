const axios = require('axios')

const config = {
  headers: {
    'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com',
    'X-RapidAPI-Key': 'fd22c19700msh323061179916009p1cd6afjsn71d33392bb38'
  },
  params: {
    lang: 'en',
    country: 'es',
    tempunit: 'C',
    dataset: 'full',
    periods: 4
  },
}

const getLocationId = async (city) => {
	const res = await axios.get(
    `https://foreca-weather.p.rapidapi.com/location/search/${encodeURI(city)}`,	
    config
  );
	return res.data.locations?.[0]?.id;
};

const getNowcast = async (locationId) => {
  const response = await axios.get(
    `https://foreca-weather.p.rapidapi.com/forecast/hourly/${locationId}`,
    config
  );
  return response.data
}

module.exports = {
  getLocationId,
  getNowcast
};