const createError = require('http-errors')
const Bill = require('../models/Bill.model')
const Ticket = require('../models/Ticket.model')
const Contract = require('../models/Contract.model')
/* const { getContracts } = require('./contract.controller')
const { getCurrentUser } = require('./users.controller') */

function randomStuff(n) {
  return Math.floor(Math.random() * n)
}

module.exports.createBill = () => {
    Contract.find({})
        .then(contracts => {
            contracts.forEach(contract => {
                Promise.all([
                    Ticket.find({ buyingUserContract: contract.id }),
                    Ticket.find({ sellingUserContract: contract.id })
                ])
                .then(responses => {
                    if(!responses[0].length && !responses[1].length){
                        if(!contract.solarPanels) {
                            const powerUsed = randomStuff(100)
                            Bill.create({
                                powerUsed: powerUsed,
                                total: (powerUsed*contract.price).toFixed(2),
                                contract: contract.id
                            })
                             .then(bill => console.log('Bill created'))
                             .catch(err => {
                                console.log(err)
                             })
                        }else{
                            const powerUsed = randomStuff(100)
                            const powerGenerated = randomStuff(75)
                            Bill.create({
                                powerUsed: powerUsed + 50,
                                powerGenerated: powerGenerated,
                                total: ((powerUsed - powerGenerated)*contract.price).toFixed(2),
                                contract: contract.id
                            })
                            .then(bill => console.log('Bill created'))
                            .catch(err => {
                                console.log(err)
                             })
                        }
                    }else{
                        if(responses[0].length) {
                            const powerUsed = randomStuff(100)
                            Bill.create({
                                powerUsed: powerUsed,
                                ticket: responses[0][0].id,

                                total: ((powerUsed - responses[0][0].quantity) * contract.price + 
                                responses[0][0].quantity * responses[0][0].price).toFixed(2),

                                contract: contract.id,
                            })
                            .then(bill => console.log('Bill created'))
                            .catch(err => {
                                console.log(err)
                             })
                        }else if(responses[1].length) {
                            const powerUsed = randomStuff(100)
                            const powerGenerated = randomStuff(75)
                            const powerSold = randomStuff(75)
                            Bill.create({
                                powerUsed: powerUsed + 50,
                                ticket: responses[1][0].id,
                                contract: contract.id,

                                total: ((powerUsed - powerGenerated) * contract.price -
                                powerSold * 0.15).toFixed(2)
                            })
                            .then(bill => console.log('Bill created'))
                            .catch(err => {
                                console.log(err)
                             })
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                 })
            })
        })
        .catch(err => {
            console.log(err)
         })
}

module.exports.getBills = (req, res, next) => {
  Contract.find({user: req.currentUser})
    .then(contracts => {
      contracts.forEach(contract => {
        Bill.find({contract: contract.id})
					.populate('contract')
          .then(bills => res.status(201).json(bills))
					.catch(err => console.error(err))
      })
  })
    .catch(next)
}