const createError = require('http-errors')
const Ticket = require('../models/Ticket.model')

module.exports.create = (req, res, next) => {
    req.body.sellingUser = req.currentUser

    Ticket.create(req.body)
      .then(ticket => res.status(201).json(ticket))
      .catch(next)
}