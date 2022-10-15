const mongoose = require('mongoose')

const ContractSchema = new mongoose.Schema(
    {
        location: {
            postalCode:{
                type: Number,
                required: [true, "Postal code is required!"],
                minLength: 5,
                maxLength: 5,
            },
            street:{
                type: String,
                required: [true, "Street is required!"],
            },
            streetNumber:{
                type: Number,
                required: [true, "Street number is required!"],
            }
        },
        power: {
            type: Number,
            required: [true, "Power is required!"]
        },
        price: {
            type: Number,
            required: [true, "Price is required!"]
        },
        solarPanels: {
            type: Number,
            minLength: 0
        },
        powerPerPanel: {
            type: Number,
            minLength: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
              delete ret.__v;
              delete ret._id;
              delete ret.password;
      
              return ret
            }
          }
    }
)

const Contract = mongoose.model("Contract", ContractSchema)

module.exports = Contract