const mongoose = require('mongoose')

const users = require("./user.data.json")
const User = require('../models/User.model')
const contracts = require("./contract.data.json")
const Contract = require("../models/Contract.model")
function randomStuff = {
    
}

require("../config/db.config")

mongoose.connection.once('open', () => {
    mongoose.connection.db.dropDatabase()
      .then(() => {
        return User.create(users)
      })
      .then(createdUsers => {
        const randomPostalCode = Math.floor(Math.random() * 100000)
        const randomPower = Math.floor(Math.random() * 1000)
        const randomStreetNumber = Math.floor(Math.random() * 100)
        const randomStreet = contracts.map(c => c.location.street)[Math.floor(Math.random() * 4) ]
        const randomContract = Math.floor(Math.random() * 4)
           const contractPromises = createdUsers.map(user =>{
            return Contract.create({
                    ...contracts[randomContract], 
                    location : {
                      street: randomStreet,
                      postalCode:  randomPostalCode, 
                      streetNumber: randomStreetNumber,
                    },
                    power: randomPower,
                    user: user.id})
            } )

            return Promise.all(contractPromises)
      
      })
      .then(contracts => console.log(contracts))

      .catch(err => {
        console.log(err);
      })
})

/* User.create(users)
  .then(users => users.forEach(user => {
    Contract.create(contracts, user.id)
  })) */