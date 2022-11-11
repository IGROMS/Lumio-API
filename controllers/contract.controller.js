const createError = require("http-errors")
const Contract = require("../models/Contract.model");
const getCoordinates = require("../services/location.services");



module.exports.create = (req, res, next) => {
  getCoordinates(`${req.body.location.streetNumber} ${req.body.location.street}, ${req.body.location.city} ${req.body.location.postalCode}`)
    .then(result  => {
      req.body.user = req.currentUser
      req.body.location.pointer = [result[0].data[0].latitude, result[0].data[0].longitude]
      Contract.create(req.body)
        .then(contract => res.status(201).json(contract))
        .catch(next)
    })
}

module.exports.getContracts = (req, res, next) => {
    Contract.find({user: req.currentUser})
      .then(contracts => res.status(201).json(contracts))
      .catch(next)
}

module.exports.getPanelContracts = (req, res, next) => {
    Contract.find({user: req.currentUser, solarPanels: { $gte: 1 }})
      .then(contracts => res.status(201).json(contracts))
      .catch(next)
}

module.exports.getContract = (req, res, next) => {
  Contract.findById(req.params.id)
    .populate('user')
    .then((contract) => {res.status(201).json(contract)})
    .catch(next)
}