const axios = require('axios');
const getCoordinates = require('../services/location.services');


module.exports.getCoordinates = async (req, res, next) => {
  getCoordinates(address);
}