const mongoose = require('mongoose')

const users = require("./user.data.json")
const User = require('../models/User.model')
const contracts = require("./contract.data.json")
const Contract = require("../models/Contract.model")
const bills = require("./bills.data.json")
const Bill   = require ("../models/Bill.model")
function randomStuff(n) {
  return Math.floor(Math.random() * n)
}

require("../config/db.config")

mongoose.connection.once('open', () => {
    mongoose.connection.db.dropDatabase()
      .then(() => {
        console.log('conectado');
        return User.create(users)
      })
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
      .then((contracts) => {console.log("connection closed")
        process.exit(1)
      })
      .catch(err => {
        console.log(err);
        process.exit(0)
      })
})