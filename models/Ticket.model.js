const mongoose = require("mongoose")

const TicketSchema = mongoose.Schema({
    sellingUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    buyingUser: {
        type: mongoose.Schema.Types.ObjectId,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
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