const axios = require('axios');
const { getNowcast, getLocationId} = require('../services/weather.services');
  
  module.exports.getNowcast = async (req, res, next) => {
    const {city} = req.params;

    if (city) {
      try {
        const locationId = await getLocationId(city);
        const nowCast = await getNowcast(locationId);
        res.json(nowCast)

      } catch (err) {
        console.log(err)
      }
    }

  }