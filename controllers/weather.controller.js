const axios = require('axios');
const { getNowcast, getLocationId} = require('../services/weather.services');
  
  module.exports.getNowcast = async (req, res, next) => {
    const {city} = req.params;

    if (city) {
      try {
        const locationId = await getLocationId(city);
        console.log(locationId);
        const nowCast = await getNowcast(locationId);
        console.log(nowCast);
        res.json(nowCast)

      } catch (e) {
        console.log(e)
      }
    }

  }