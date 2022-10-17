const mongoose = require("mongoose")

const TicketSchema = mongoose.Schema({
    sellingUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    buyingUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    buyingUserContract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract"
    }
},
{
    timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
              delete ret.__v;
              delete ret._id;
      
              return ret
            }
          }
})

const Ticket = mongoose.model("Ticket", TicketSchema)

module.exports = Ticket