const createError = require('http-errors')
const Bill = require('../models/Bill.model')
const Ticket = require('../models/Ticket.model')
const Contract = require('../models/Contract.model')
const { getContracts } = require('./contract.controller')

const contracts = getContracts()

