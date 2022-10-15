const createError = require("http-errors")
const Contract = require("../models/Contract.model")

module.exports.create = (req, res, next) => {
    req.body.user = req.currentUser
    console.log(req.currentUser);
    
    Contract.create(req.body)
      .then(contract => res.status(201).json(contract))
      .catch(next)
}

module.exports.getContract = (req, res, next) => {
    Contract.findById()
}