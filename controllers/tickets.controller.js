const createError = require('http-errors')
const Ticket = require('../models/Ticket.model')

module.exports.create = (req, res, next) => {
    req.body.sellingUser = req.currentUser
    console.log(req.currentUser);

    Ticket.create(req.body)
      .then(ticket => res.status(201).json(ticket))
      .catch(next)
}

module.exports.buy = (req, res, next) => {
    const { id } = req.params
    console.log(req.currentUser);
    Ticket.findByIdAndUpdate(id, {buyingUser: req.currentUser}, {new: true})
      .then(ticket => res.status(201).json(ticket))
      .catch(err => {
        console.log(err)
      })
}