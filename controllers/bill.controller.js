const createError = require('http-errors')
const Bill = require('../models/Bill.model')
const Ticket = require('../models/Ticket.model')
const Contract = require('../models/Contract.model')
const { getContracts } = require('./contract.controller')
const { getCurrentUser } = require('./users.controller')

const contracts = getContracts()
const user = getCurrentUser()

module.exports.createBill = (req, res, next) => {

    contracts.forEach(contract => {
        const isBuyingUser = Ticket.find({ buyingUserContract: contract.id})
        const isSellingUser = Ticket.find({ sellingUserContract: contract.id})

        if(!isBuyingUser && !isSellingUser){
            if(!contract.solarPanels) {
                Bill.create({
                    
                })

            }
        }
    })
}