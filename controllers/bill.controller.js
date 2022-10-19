const createError = require('http-errors')
const Bill = require('../models/Bill.model')
const Ticket = require('../models/Ticket.model')
const Contract = require('../models/Contract.model')
/* const { getContracts } = require('./contract.controller')
const { getCurrentUser } = require('./users.controller') */

//const user = getCurrentUser()

function randomStuff(n) {
    return Math.floor(Math.random() * n)
}

module.exports.createBill = () => {
    Contract.find({})
        .then(contracts => {
            contracts.forEach(contract => {
                Promise.all([
                    Ticket.find({ buyingUserContract: contract.id}),
                    Ticket.find({ sellingUserContract: contract.id})
                ])
                .then(responses => {
                    if(!responses[0].length && !responses[1].length){
                        if(!contract.solarPanels) {
                            console.log('entro');
                            const powerUsed = randomStuff(100)
                            Bill.create({
                                powerUsed: powerUsed,
                                total: powerUsed*contract.price,
                                contract: contract.id
                            })
                             .then(bill => console.log(bill.id))
                             .catch(err => {
                                console.log(err)
                             })
                        }else{
                            const powerUsed = randomStuff(100)
                            const powerGenerated = randomStuff(100)
                            Bill.create({
                                powerUsed: powerUsed + 50,
                                powerGenerated: powerGenerated,
                                total: (powerUsed - powerGenerated)*contract.price,
                                contract: contract.id
                            })
                            .then(bill => console.log(bill.id))
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