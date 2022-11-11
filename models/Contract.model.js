const mongoose = require('mongoose')

BILLING_ACCOUNT= /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/gm

const ContractSchema = new mongoose.Schema(
    {
        location: {
            postalCode:{
                type: Number,
                required: [true, "Postal code is required!"],
                minLength: 5,
                maxLength: 5,
            },
            city: {
                type: String,
                required: [true, "City is required!"],
                mingLength: 3,
            },
            street:{
                type: String,
                required: [true, "Street is required!"],
            },
            streetNumber:{
                type: Number,
                required: [true, "Street number is required!"],
            },
            pointer: {
                type: Array,
                maxLength: 2
            }
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
        billingAccount: {
            type: String,
            required: [true, "Billing Account is required"],
            match: BILLING_ACCOUNT
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