const mongoose = require('mongoose')

const users = require("./user.data.json")
const User = require('../models/User.model')
const contracts = require("./contract.data.json")
const Contract = require("../models/Contract.model")
function randomStuff(n) {
  return Math.floor(Math.random() * n)
}

require("../config/db.config")

mongoose.connection.once('open', () => {
    mongoose.connection.db.dropDatabase()
      .then(() => {
        return User.create(users)
      })
      .then(createdUsers => {
        /* const randomPostalCode = randomStuff(100000)
        const randomPower = randomStuff(1000)
        const randomStreetNumber = randomStuff(100)
        const randomStreet = contracts.map(c => c.location.street)[randomStuff(4)]
        const randomContract = randomStuff(4) */
      
        return Contract.create(contracts)
            
      
      })
      .then((contracts) => {console.log(contracts, "connection closed")
        process.exit(1)
      })
      .catch(err => {
        console.log(err);
        process.exit(0)
      })
})

/* User.create(users)
  .then(users => users.forEach(user => {
    Contract.create(contracts, user.id)
  })) */