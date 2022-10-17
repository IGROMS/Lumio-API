const createError = require('http-errors')
const Ticket = require('../models/Ticket.model')
const Contract = require('../models/Contract.model')

module.exports.create = (req, res, next) => {
    req.body.sellingUser = req.currentUser

    Ticket.create(req.body)
      .then(ticket => res.status(201).json(ticket))
      .catch(next)
}

module.exports.buy = (req, res, next) => {
    const { id } = req.params
    Contract.find({user: req.currentUser})
      .then((userContracts) => {
        if(userContracts.includes(req.body.contract)){
          Ticket.findByIdAndUpdate(id, {buyingUser: req.currentUser, buyingUserContract: req.body.contract}, {new: true})
            .then((ticket) => res.status(201).json(ticket))
            .catch(err => {
              console.log(err)
            })
        }else {
          return res.status(401).json({"error": "Select a valid contract"})
        }
      })
      .catch(err => console.log(err))
}

module.exports.getTickets = (req, res, next) => {
  Ticket.find({buyingUser: null})
    .then(tickets => res.status(201).json(tickets))
    .catch(next)
}