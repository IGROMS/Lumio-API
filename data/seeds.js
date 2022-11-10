const mongoose = require('mongoose')

const users = require("./user.data.json")
const User = require('../models/User.model')
const contracts = require("./contract.data.json")
const Contract = require("../models/Contract.model")
const bills = require("./bills.data.json")
const Bill   = require ("../models/Bill.model")

module.exports.cosas = () => {
  console.log('entro')
  User.create(users)
  .then(() => {
    console.log('usuarios creados');
    return Contract.create(contracts)
  })
  .then(() => {
    console.log('contratos creados');
    return Bill.create(bills, 'Exiting process')
  })
  .then(() => {
    console.log('bills creadas')
  })
  .then((contracts) => {
    console.log("connection closed")
    process.exit(1)
  })
  .catch(err => {
    console.log(err);
    process.exit(0)
  })

}
